/* Keeps money talk off Connect, to protect students from scams.
   The same rule runs in the database (supabase/schema.sql, no_payment_details),
   so it holds even if someone bypasses the app. */

const PAYMENT_TALK =
  /\baza\b|\bacct\b|\ba\/c\b|\baccount\s*(?:number|no|num)\b|\bacc\.?\s*(?:number|no|num)\b|(?:^|\D)\d{10}(?:\D|$)/i;

export const PAYMENT_NOTE =
  'To protect everyone from scams, Connect doesn’t allow payment or bank details, like “aza”, “acct” or an account number. Keep payments off Connect.';

export function hasPaymentTalk(...texts: (string | null | undefined)[]) {
  return texts.some((t) => Boolean(t && PAYMENT_TALK.test(t)));
}

/** Throws the friendly note when text contains payment details */
export function assertNoPaymentTalk(...texts: (string | null | undefined)[]) {
  if (hasPaymentTalk(...texts)) throw new Error(PAYMENT_NOTE);
}
