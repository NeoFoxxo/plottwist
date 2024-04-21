import Header from "@/components/Header"
import { ThemeProvider } from "@/components/ThemeProvider"
import { siteurl } from "@/utils/siteurl"
import { createClient } from "@/utils/supabase/server"
import { GeistSans } from "geist/font/sans"
import "./globals.css"

export const metadata = {
	metadataBase: new URL(siteurl),
	title: {
		default: "Plottwist",
		template: "%s | Plottwist"
	},
	description: "Plottwist. Stories for you.",
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const supabase = createClient()

	const {
		data: { user },
	} = await supabase.auth.getUser()

	let username

	if (user) {
		const { data, error } = await supabase
			.from("profiles")
			.select("name")
			.eq("user_id", user.id)
		if (error) {
			console.error("Error fetching username:", error)
		} else if (data && data.length > 0) {
			username = data[0].name
		}
	}

	return (
		<html lang="en" className={GeistSans.className}>
			<body className="bg-[url('/gif4.gif')] bg-background bg-cover bg-fixed bg-no-repeat bg-center text-foreground">
				<main className="flex flex-col items-center min-h-screen">
					<ThemeProvider
						attribute="class"
						defaultTheme="dark"
						enableSystem
						disableTransitionOnChange
					>
						<Header
							username={username!!}
							email={user?.email}
							userId={user?.id}
						/>
						<div>{children}</div>
					</ThemeProvider>
				</main>
			</body>
		</html>
	)
}
