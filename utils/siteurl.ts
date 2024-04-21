const production = process.env.NODE_ENV === "production"
export const siteurl = production
	? "https://plottwist.vercel.app"
	: "http://localhost:3000"
