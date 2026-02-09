export const USERS_LIST_CACHE_KEY_PREFIX = "users:list";
export const USERS_DETAIL_CACHE_KEY_PREFIX = "users:detail";
export const DONORS_LIST_CACHE_KEY_PREFIX = "donors:list";
export const BLOOD_BANKS_LIST_CACHE_KEY_PREFIX = "blood-banks:list";
export const DONATIONS_LIST_CACHE_KEY_PREFIX = "donations:list";
export const ADMIN_DASHBOARD_CACHE_KEY_PREFIX = "admin:dashboard";
export const TEST_USERS_CACHE_KEY = "test:users";

export function usersListCacheKey(page: number, limit: number) {
  return `${USERS_LIST_CACHE_KEY_PREFIX}:p${page}:l${limit}`;
}

export const USERS_LIST_CACHE_PATTERN = `${USERS_LIST_CACHE_KEY_PREFIX}:*`;

export function userDetailCacheKey(id: string) {
  return `${USERS_DETAIL_CACHE_KEY_PREFIX}:${id}`;
}

export const USERS_DETAIL_CACHE_PATTERN = `${USERS_DETAIL_CACHE_KEY_PREFIX}:*`;

export function donorsListCacheKey(params: {
  page: number;
  limit: number;
  bloodType?: string | null;
  city?: string | null;
  isActive?: string | null;
}) {
  const bloodType = params.bloodType?.toLowerCase() || "all";
  const city = params.city?.toLowerCase() || "all";
  const isActive = params.isActive?.toLowerCase() || "all";
  return `${DONORS_LIST_CACHE_KEY_PREFIX}:p${params.page}:l${params.limit}:b${bloodType}:c${city}:a${isActive}`;
}

export const DONORS_LIST_CACHE_PATTERN = `${DONORS_LIST_CACHE_KEY_PREFIX}:*`;

export function bloodBanksListCacheKey(params: {
  page: number;
  limit: number;
  bloodType?: string | null;
  city?: string | null;
}) {
  const bloodType = params.bloodType?.toLowerCase() || "all";
  const city = params.city?.toLowerCase() || "all";
  return `${BLOOD_BANKS_LIST_CACHE_KEY_PREFIX}:p${params.page}:l${params.limit}:b${bloodType}:c${city}`;
}

export const BLOOD_BANKS_LIST_CACHE_PATTERN = `${BLOOD_BANKS_LIST_CACHE_KEY_PREFIX}:*`;

export const DONATIONS_LIST_CACHE_KEY = `${DONATIONS_LIST_CACHE_KEY_PREFIX}:recent`;
export const DONATIONS_LIST_CACHE_PATTERN = `${DONATIONS_LIST_CACHE_KEY_PREFIX}:*`;

export function adminDashboardCacheKey(userId: string | null) {
  return `${ADMIN_DASHBOARD_CACHE_KEY_PREFIX}:${userId ?? "anonymous"}`;
}
