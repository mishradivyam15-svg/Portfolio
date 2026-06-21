interface RateLimitRecord {
  timestamps: number[];
}

const cache = new Map<string, RateLimitRecord>();

// Clean up old entries every 5 minutes to prevent memory leaks
if (typeof window === 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, value] of cache.entries()) {
      // Remove timestamps older than 1 minute
      const valid = value.timestamps.filter((ts) => now - ts < 60000);
      if (valid.length === 0) {
        cache.delete(key);
      } else {
        cache.set(key, { timestamps: valid });
      }
    }
  }, 300000);
}

export function rateLimit(ip: string, limit: number = 5, windowMs: number = 60000): { success: boolean; remaining: number } {
  const now = Date.now();
  const record = cache.get(ip) || { timestamps: [] };
  
  // Filter out expired timestamps
  const activeTimestamps = record.timestamps.filter((ts) => now - ts < windowMs);
  
  if (activeTimestamps.length >= limit) {
    return {
      success: false,
      remaining: 0,
    };
  }
  
  activeTimestamps.push(now);
  cache.set(ip, { timestamps: activeTimestamps });
  
  return {
    success: true,
    remaining: limit - activeTimestamps.length,
  };
}
