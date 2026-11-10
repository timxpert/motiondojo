import crypto from 'node:crypto';

/**
 * Paystack webhook. In the Paystack dashboard set the webhook URL to
 * https://<your domain>/api/paystack-webhook. Needs PAYSTACK_SECRET_KEY on the server.
 */
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) return new Response('Not configured', { status: 500 });

  const raw = await req.text();
  const signature = req.headers.get('x-paystack-signature') || '';
  const expected = crypto.createHmac('sha512', secret).update(raw).digest('hex');

  const valid =
    signature.length === expected.length &&
    crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  if (!valid) return new Response('Invalid signature', { status: 401 });

  let event: { event?: string; data?: Record<string, unknown> } = {};
  try {
    event = JSON.parse(raw);
  } catch {
    return new Response('Bad payload', { status: 400 });
  }

  if (event.event === 'charge.success') {
    const d = event.data || {};
    const customer = (d.customer || {}) as { email?: string };
    console.log('[paystack] charge.success', {
      reference: d.reference,
      amount: d.amount,
      currency: d.currency,
      email: customer.email,
      metadata: d.metadata,
    });
  }

  return new Response('ok', { status: 200 });
}
