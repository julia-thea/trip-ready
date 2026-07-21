'use server';

import { createHash, randomBytes } from 'crypto';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { Resend } from 'resend';
import { prisma } from '@/lib/prisma';

const TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour
const MIN_PASSWORD_LENGTH = 8;

export type PasswordResetState = {
  ok?: boolean;
  error?: string;
};

function getAppUrl(): string {
  return (
    process.env.AUTH_URL?.replace(/\/$/, '') ||
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') ||
    'http://localhost:3000'
  );
}

function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

async function sendResetEmail(to: string, resetUrl: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log('[password-reset] RESEND_API_KEY unset — reset URL:', resetUrl);
    return;
  }

  const from = process.env.EMAIL_FROM || 'Trip Ready <onboarding@resend.dev>';
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to,
    subject: 'Reset your Trip Ready password',
    html: `
      <p>You requested a password reset for Trip Ready.</p>
      <p><a href="${resetUrl}">Reset your password</a></p>
      <p>This link expires in 1 hour. If you did not request this, you can ignore this email.</p>
    `,
  });

  if (error) {
    console.error('[password-reset] Resend error:', error);
    throw new Error('Failed to send reset email');
  }
}

/**
 * Request a password reset email.
 * Always returns { ok: true } when the email looks valid — does not reveal whether the account exists.
 */
export async function requestPasswordReset(
  _previousState: PasswordResetState,
  formData: FormData
): Promise<PasswordResetState> {
  const email = normalizeEmail((formData.get('email') as string) || '');

  if (!email || !email.includes('@') || !email.includes('.')) {
    return { error: 'Please enter a valid email address' };
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (user?.password) {
      const rawToken = randomBytes(32).toString('hex');
      const tokenHash = hashToken(rawToken);
      const expires = new Date(Date.now() + TOKEN_TTL_MS);

      await prisma.verificationToken.deleteMany({ where: { identifier: email } });
      await prisma.verificationToken.create({
        data: {
          identifier: email,
          token: tokenHash,
          expires,
        },
      });

      const resetUrl = `${getAppUrl()}/reset-password?token=${encodeURIComponent(rawToken)}&email=${encodeURIComponent(email)}`;
      await sendResetEmail(email, resetUrl);
    }
  } catch (error) {
    console.error('[password-reset] request failed:', error);
    return { error: 'Something went wrong. Please try again.' };
  }

  return { ok: true };
}

/**
 * Set a new password using a reset token from the email link.
 */
export async function resetPassword(
  _previousState: PasswordResetState,
  formData: FormData
): Promise<PasswordResetState> {
  const email = normalizeEmail((formData.get('email') as string) || '');
  const token = (formData.get('token') as string) || '';
  const password = (formData.get('password') as string) || '';
  const confirmPassword = (formData.get('confirmPassword') as string) || '';

  if (!email || !token) {
    return { error: 'Invalid or missing reset link. Request a new one.' };
  }

  if (!password || password.length < MIN_PASSWORD_LENGTH) {
    return { error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters` };
  }

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match' };
  }

  const tokenHash = hashToken(token);

  const verification = await prisma.verificationToken.findUnique({
    where: {
      identifier_token: {
        identifier: email,
        token: tokenHash,
      },
    },
  });

  if (!verification || verification.expires < new Date()) {
    return { error: 'This reset link is invalid or has expired. Request a new one.' };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return { error: 'This reset link is invalid or has expired. Request a new one.' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.$transaction([
    prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    }),
    prisma.verificationToken.deleteMany({ where: { identifier: email } }),
  ]);

  redirect('/login');
}
