const CONTACT_RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const CONTACT_RATE_LIMIT_MAX_REQUESTS = 3;

const requestLog = new Map<string, number[]>();

export interface ContactRateLimitResult {
  limited: boolean;
  retryAfterMs: number;
  remaining: number;
}

export function getContactRequestFingerprint(req: Request): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  const userAgent = req.headers.get('user-agent') ?? '';

  const ip = forwardedFor?.split(',')[0]?.trim() || realIp?.trim() || '';

  if (!ip && !userAgent) return 'unknown';

  return userAgent ? `${ip}|${userAgent}` : ip;
}

export function checkContactRateLimit(
  fingerprint: string,
  now = Date.now(),
): ContactRateLimitResult {
  const key = fingerprint || 'unknown';
  const recentRequests = (requestLog.get(key) ?? []).filter(
    (timestamp) => now - timestamp < CONTACT_RATE_LIMIT_WINDOW_MS,
  );

  if (recentRequests.length >= CONTACT_RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(key, recentRequests);

    return {
      limited: true,
      retryAfterMs: Math.max(
        0,
        CONTACT_RATE_LIMIT_WINDOW_MS - (now - recentRequests[0]),
      ),
      remaining: 0,
    };
  }

  recentRequests.push(now);
  requestLog.set(key, recentRequests);

  return {
    limited: false,
    retryAfterMs: 0,
    remaining: Math.max(
      0,
      CONTACT_RATE_LIMIT_MAX_REQUESTS - recentRequests.length,
    ),
  };
}
