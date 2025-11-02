import { Resend } from 'resend';
import { ReactElement } from 'react';

/**
 * Initialize Resend client with API key from environment
 */
export const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send email options interface
 */
export interface SendEmailOptions {
  to: string | string[];
  from: string;
  subject: string;
  react: ReactElement;
  replyTo?: string;
  cc?: string | string[];
  bcc?: string | string[];
  tags?: { name: string; value: string }[];
}

/**
 * Send an email using Resend with a React Email component
 *
 * @param options - Email sending options
 * @returns Promise with the result containing the email ID
 *
 * @example
 * ```ts
 * import { MybitTokenLaunch } from '../emails/mybit-token-launch';
 *
 * const result = await sendEmail({
 *   to: 'user@example.com',
 *   from: 'noreply@yourdomain.com',
 *   subject: 'New Token Launch: Meteora',
 *   react: MybitTokenLaunch({ tokenName: 'Meteora', tokenSymbol: 'MET' }),
 * });
 * ```
 */
export async function sendEmail(options: SendEmailOptions) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error(
      'RESEND_API_KEY is not set in environment variables. ' +
      'Get your API key from https://resend.com/api-keys'
    );
  }

  try {
    const data = await resend.emails.send({
      to: options.to,
      from: options.from,
      subject: options.subject,
      react: options.react,
      replyTo: options.replyTo,
      cc: options.cc,
      bcc: options.bcc,
      tags: options.tags,
    });

    return data;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}
