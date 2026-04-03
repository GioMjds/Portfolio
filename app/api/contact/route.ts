import { NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/contact/emailjs';
import {
  checkContactRateLimit,
  getContactRequestFingerprint,
} from '@/lib/contact/rate-limit';
import {
  contactFormSchema,
  formatContactFieldErrors,
  type ContactApiResponse,
  type ContactFormValues,
} from '@/lib/contact/schema';

function jsonResponse(body: ContactApiResponse, status: number) {
  return NextResponse.json<ContactApiResponse>(body, { status });
}

export async function POST(req: Request) {
  const requestId = crypto.randomUUID();

  let payload: unknown;
  const data = await req.json().catch(() => null);

  try {
    payload = data as ContactFormValues;
  } catch (error) {
    console.error('[contact] invalid-json', {
      requestId,
      error: error instanceof Error ? error.message : String(error),
    });

    return jsonResponse(
      {
        ok: false,
        message: 'Invalid request payload.',
      },
      400,
    );
  }

  const parsedPayload = contactFormSchema.safeParse(payload);
  if (!parsedPayload.success) {
    return jsonResponse(
      {
        ok: false,
        message: 'Please fix the highlighted fields and try again.',
        fieldErrors: formatContactFieldErrors(parsedPayload.error),
      },
      400,
    );
  }

  const companyWebsite = parsedPayload.data.companyWebsite?.trim();
  if (companyWebsite) {
    console.warn('[contact] honeypot-triggered', { requestId });
    return jsonResponse(
      {
        ok: false,
        message: 'Unable to process this submission.',
      },
      400,
    );
  }

  const fingerprint = getContactRequestFingerprint(req);
  const rateLimitResult = checkContactRateLimit(fingerprint);
  if (rateLimitResult.limited) {
    console.warn('[contact] rate-limited', {
      requestId,
      fingerprint,
      retryAfterMs: rateLimitResult.retryAfterMs,
    });

    return jsonResponse(
      {
        ok: false,
        message: 'Too many requests. Please wait and try again shortly.',
      },
      429,
    );
  }

  try {
    const origin = req.headers.get('origin') ?? undefined;
    const referer = req.headers.get('referer') ?? undefined;
    const emailResult = await sendContactEmail(parsedPayload.data, {
      origin,
      referer,
    });

    if (!emailResult.success) {
      console.error('[contact] provider-error', {
        requestId,
        providerStatus: emailResult.providerStatus,
        providerErrorCode: emailResult.providerErrorCode,
        providerMessage: emailResult.message,
      });

      return jsonResponse(
        {
          ok: false,
          message: 'Message delivery failed. Please try again in a moment.',
        },
        502,
      );
    }

    return jsonResponse(
      {
        ok: true,
        message: 'Message sent successfully.',
        requestId,
      },
      200,
    );
  } catch (error) {
    console.error('[contact] internal-error', {
      requestId,
      error: error instanceof Error ? error.message : String(error),
    });

    return jsonResponse(
      {
        ok: false,
        message: 'We could not send your message right now. Please try again soon.',
      },
      500,
    );
  }
}
