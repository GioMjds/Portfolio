import 'server-only';

import type { ContactFormPayload } from '@/lib/contact/schema';

interface EmailJsProviderSuccess {
  success: true;
  providerStatus: number;
}

interface EmailJsProviderFailure {
  success: false;
  providerStatus?: number;
  providerErrorCode?: string;
  message: string;
}

export type EmailJsProviderResult =
  | EmailJsProviderSuccess
  | EmailJsProviderFailure;

interface EmailJsRequestContext {
  origin?: string;
  referer?: string;
}

interface EmailJsConfig {
  endpoint: string;
  serviceId: string;
  templateId: string;
  publicKey: string;
  privateKey?: string;
  recipientEmail?: string;
}

function getEmailJsConfig(): EmailJsConfig {
  const serviceId =
    process.env.EMAILJS_SERVICE_ID ??
    process.env.EMAILJS_SERVICE_ID_DEV ??
    process.env.EMAILJS_SERVICE_ID_PROD;
  const templateId =
    process.env.EMAILJS_TEMPLATE_ID ??
    process.env.EMAILJS_TEMPLATE_ID_DEV ??
    process.env.EMAILJS_TEMPLATE_ID_PROD;

  const endpoint =
    process.env.EMAILJS_API_URL ??
    'https://api.emailjs.com/api/v1.0/email/send';
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;
  const recipientEmail = process.env.EMAILJS_TO_EMAIL;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error(
      'EmailJS configuration is incomplete. Required: EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY.',
    );
  }

  return {
    endpoint,
    serviceId,
    templateId,
    publicKey,
    privateKey,
    recipientEmail,
  };
}

function mapPayloadToTemplateParams(
  payload: ContactFormPayload,
  toEmail?: string,
) {
  return {
    from_name: payload.name,
    from_email: payload.email,
    subject: payload.subject,
    message: payload.message,
    to_email: toEmail ?? '',
    reply_to: payload.email,
  };
}

export async function sendContactEmail(
  payload: ContactFormPayload,
  requestContext: EmailJsRequestContext = {},
): Promise<EmailJsProviderResult> {
  const config = getEmailJsConfig();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (requestContext.origin) {
    headers.Origin = requestContext.origin;
  }

  if (requestContext.referer) {
    headers.Referer = requestContext.referer;
  }

  const response = await fetch(config.endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      service_id: config.serviceId,
      template_id: config.templateId,
      user_id: config.publicKey,
      ...(config.privateKey ? { accessToken: config.privateKey } : {}),
      template_params: mapPayloadToTemplateParams(
        payload,
        config.recipientEmail,
      ),
    }),
    cache: 'no-store',
  });

  if (response.ok) {
    return {
      success: true,
      providerStatus: response.status,
    };
  }

  const providerErrorText = await response.text();
  return {
    success: false,
    providerStatus: response.status,
    providerErrorCode: 'emailjs_request_failed',
    message:
      providerErrorText.trim() ||
      'Email provider rejected the submission request.',
  };
}
