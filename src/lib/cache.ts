/**
 * Simple in-memory cache with TTL support
 * For production, integrate Redis
 */

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

class Cache {
  private store = new Map<string, CacheEntry<any>>();

  /**
   * Get value from cache
   */
  get<T>(key: string): T | null {
    const entry = this.store.get(key);

    if (!entry) return null;

    // Check if expired
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return null;
    }

    return entry.value as T;
  }

  /**
   * Set value in cache with TTL
   */
  set<T>(key: string, value: T, ttlMs: number): void {
    this.store.set(key, {
      value,
      expiresAt: Date.now() + ttlMs,
    });
  }

  /**
   * Delete from cache
   */
  delete(key: string): boolean {
    return this.store.delete(key);
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.store.clear();
  }

  /**
   * Get cache size
   */
  size(): number {
    return this.store.size;
  }

  /**
   * Check if key exists
   */
  has(key: string): boolean {
    const entry = this.store.get(key);
    if (!entry) return false;

    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return false;
    }

    return true;
  }
}

export const cache = new Cache();

/**
 * Cache key generator
 */
export const cacheKeys = {
  user: (userId: string) => `user:${userId}`,
  usersList: (page: number, limit: number) => `users:list:${page}:${limit}`,
  attendance: (userId: string, date: string) => `attendance:${userId}:${date}`,
  attendanceStats: (userId: string, month: string) =>
    `attendance:stats:${userId}:${month}`,
  leaves: (userId: string, status: string) => `leaves:${userId}:${status}`,
  leaveBalance: (userId: string) => `leave:balance:${userId}`,
  payroll: (month: string, year: string) => `payroll:${month}:${year}`,
  dashboard: (userId: string, role: string) =>
    `dashboard:${userId}:${role}`,
  reports: (type: string, period: string) => `reports:${type}:${period}`,
};
