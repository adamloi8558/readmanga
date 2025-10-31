/**
 * Helper functions for Stats API
 */

/**
 * Get date range for weekly stats (last 7 days)
 */
export function getWeeklyDateRange() {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 7);
  
  return { startDate, endDate };
}

/**
 * Get date range for monthly stats (last 30 days)
 */
export function getMonthlyDateRange() {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);
  
  return { startDate, endDate };
}

/**
 * Get date range for yearly stats (last 365 days)
 */
export function getYearlyDateRange() {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);
  
  return { startDate, endDate };
}

