/**
 * IndexNow integration — pings Bing, Yandex, Seznam, Naver and any other
 * IndexNow-compatible search engines whenever a URL is created or updated.
 *
 * The protocol is documented at https://www.indexnow.org. Google does not
 * currently consume IndexNow but does react to sitemap pings + the property
 * being verified in Search Console (handled separately, manual steps).
 *
 * Setup:
 * 1. The key file `public/9853400ff83ba6e9ad6a139944b0d75d.txt` is served at
 *    https://www.perrinehuon.com/9853400ff83ba6e9ad6a139944b0d75d.txt and is
 *    used by IndexNow to verify ownership.
 * 2. Call `submitToIndexNow([url1, url2, ...])` from a server action or API
 *    route after publishing/updating content (blog posts, portfolio items,
 *    location/profession pages, services).
 * 3. Bing automatically forwards IndexNow notifications to participating
 *    crawlers (Yandex, Seznam, Naver, …).
 */

const INDEXNOW_KEY = '9853400ff83ba6e9ad6a139944b0d75d';
const HOST = 'www.perrinehuon.com';
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

const ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
] as const;

export type IndexNowResult = {
  endpoint: string;
  status: number;
  ok: boolean;
};

/**
 * Submit one or many URLs to IndexNow. Use absolute URLs (https://...).
 * Returns the HTTP status returned by each endpoint (200/202 = accepted,
 * 422 = invalid URL, 429 = throttled).
 */
export async function submitToIndexNow(
  urls: string[],
): Promise<IndexNowResult[]> {
  if (urls.length === 0) return [];

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  const results = await Promise.all(
    ENDPOINTS.map(async (endpoint) => {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        return { endpoint, status: res.status, ok: res.ok };
      } catch {
        return { endpoint, status: 0, ok: false };
      }
    }),
  );

  return results;
}

/** Convenience helper for a single URL. */
export function submitUrlToIndexNow(url: string): Promise<IndexNowResult[]> {
  return submitToIndexNow([url]);
}
