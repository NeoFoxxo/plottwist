const production = process.env.NODE_ENV === "production"
export const siteurl = production
	? "https://plottwistapp.com"
	: "http://localhost:3000"
