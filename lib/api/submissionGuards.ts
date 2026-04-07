type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const globalRateLimitStore = globalThis as typeof globalThis & {
  __submissionRateLimitStores?: Map<string, Map<string, RateLimitEntry>>;
};

function getSubmissionRateLimitStores() {
  if (!globalRateLimitStore.__submissionRateLimitStores) {
    globalRateLimitStore.__submissionRateLimitStores = new Map();
  }

  return globalRateLimitStore.__submissionRateLimitStores;
}

export function asTrimmedString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

export function getClientIp(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0]?.trim() || 'unknown';
  return request.headers.get('x-real-ip')?.trim() || 'unknown';
}

export function isRateLimited(params: {
  bucket: string;
  ip: string;
  windowMs: number;
  maxRequests: number;
}) {
  const { bucket, ip, windowMs, maxRequests } = params;
  const stores = getSubmissionRateLimitStores();
  const store = stores.get(bucket) ?? new Map<string, RateLimitEntry>();
  if (!stores.has(bucket)) {
    stores.set(bucket, store);
  }

  const now = Date.now();
  const existing = store.get(ip);

  if (!existing || existing.resetAt <= now) {
    store.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }

  if (existing.count >= maxRequests) return true;

  existing.count += 1;
  return false;
}
