export const siteurl = process.env.VERCEL_URL
  ? `https://${process.env.NEXT_VERCEL_URL}`
  : "http://localhost:3000";
