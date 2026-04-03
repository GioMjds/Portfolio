import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters.')
    .max(80, 'Name must be 80 characters or fewer.'),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email({ error: 'Enter a valid email address.' })),
  subject: z
    .string()
    .trim()
    .min(3, 'Subject must be at least 3 characters.')
    .max(120, 'Subject must be 120 characters or fewer.'),
  message: z
    .string()
    .trim()
    .min(20, 'Message must be at least 20 characters.')
    .max(2000, 'Message must be 2000 characters or fewer.'),
  companyWebsite: z.string().trim().optional().default(''),
});

export type ContactFormValues = z.input<typeof contactFormSchema>;
export type ContactFormPayload = z.output<typeof contactFormSchema>;
export type ContactFieldErrors = Partial<
  Record<keyof ContactFormPayload, string[]>
>;

export interface ContactApiSuccessResponse {
  ok: true;
  message: string;
  requestId: string;
}

export interface ContactApiErrorResponse {
  ok: false;
  message: string;
  fieldErrors?: ContactFieldErrors;
}

export type ContactApiResponse =
  | ContactApiSuccessResponse
  | ContactApiErrorResponse;

export function formatContactFieldErrors(
  error: z.ZodError<ContactFormValues>,
): ContactFieldErrors {
  const fieldErrors = z.flattenError(error).fieldErrors;

  return Object.fromEntries(
    Object.entries(fieldErrors).filter((entry): entry is [string, string[]] =>
      Boolean(entry[1]?.length),
    ),
  ) as ContactFieldErrors;
}
