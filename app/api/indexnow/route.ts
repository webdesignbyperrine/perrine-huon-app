import { NextResponse } from 'next/server';
import { submitToIndexNow } from '@/lib/indexnow';

const ALLOWED_HOST = 'www.perrinehuon.com';

/**
 * POST /api/indexnow
 *
 * Body: { "urls": ["https://www.perrinehuon.com/blog/...", ...] }
 *
 * Use from admin server actions after publishing/updating content. Optionally
 * protected by a shared secret in `INDEXNOW_API_TOKEN` (sent via the
 * `Authorization: Bearer <token>` header).
 */
export async function POST(request: Request) {
  const expectedToken = process.env.INDEXNOW_API_TOKEN;
  if (expectedToken) {
    const auth = request.headers.get('authorization');
    if (auth !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  let body: { urls?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const urls = Array.isArray(body.urls) ? body.urls.filter((u): u is string => typeof u === 'string') : [];
  if (urls.length === 0) {
    return NextResponse.json({ error: 'No URLs provided' }, { status: 400 });
  }

  const invalid = urls.find((u) => {
    try {
      const parsed = new URL(u);
      return parsed.host !== ALLOWED_HOST;
    } catch {
      return true;
    }
  });
  if (invalid) {
    return NextResponse.json(
      { error: `URL must use host ${ALLOWED_HOST}: ${invalid}` },
      { status: 400 },
    );
  }

  const results = await submitToIndexNow(urls);
  return NextResponse.json({ submitted: urls.length, results });
}
