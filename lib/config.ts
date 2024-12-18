export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL!,
  environment: process.env.NEXT_PUBLIC_ENVIRONMENT!,
  features: {
    bulkLookup: process.env.NEXT_PUBLIC_ENABLE_BULK_LOOKUP === 'true',
    advancedFilters: process.env.NEXT_PUBLIC_ENABLE_ADVANCED_FILTERS === 'true',
  },
  analytics: {
    id: process.env.NEXT_PUBLIC_ANALYTICS_ID,
  },
  sentry: {
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  },
} as const;

export function validateConfig() {
  const requiredVars = ['NEXT_PUBLIC_API_URL', 'NEXT_PUBLIC_ENVIRONMENT'];
  
  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      throw new Error(`Missing required environment variable: ${varName}`);
    }
  }
}