export class RateLimiter {
  private store = new Map<string, { count: number; time: number }>();

  allow(key: string, limit = 100, windowMs = 15 * 60 * 1000) {
    const now = Date.now();
    const record = this.store.get(key);

    if (!record || now - record.time > windowMs) {
      this.store.set(key, { count: 1, time: now });
      return true;
    }

    if (record.count >= limit) return false;
    record.count++;
    return true;
  }
}
