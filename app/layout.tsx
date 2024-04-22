import Header from "@/components/Header"
import { ThemeProvider } from "@/components/ThemeProvider"
import { siteurl } from "@/utils/siteurl"
import { createClient } from "@/utils/supabase/server"
import { GeistSans } from "geist/font/sans"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

export const metadata = {
	metadataBase: new URL(siteurl),
	title: {
		default: "plottwist. | Create Interactive Stories",
		template: "%s | plottwist.",
	},
	description:
		"Discover Plot Twist, a unique platform to create interactive stories where your choices shape the narrative. Explore stories created by the community or share your own. Join Plot Twist today and unlock your storytelling potential.",
	keywords:
		"Plot Twist, interactive stories, AI, storytelling, user-generated content, narratives, creative writing, artificial intelligence, digital storytelling",
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
						<Toaster />
					</ThemeProvider>
				</main>
			</body>
		</html>
	)
}
