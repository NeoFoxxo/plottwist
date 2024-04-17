import Header from "@/components/Header"
import { ThemeProvider } from "@/components/ThemeProvider"
import { siteurl } from "@/utils/siteurl"
import { createClient } from "@/utils/supabase/server"
import { GeistSans } from "geist/font/sans"
import "./globals.css"
import Head from "next/head"
import Footer from "@/components/Footer"

export const metadata = {
	metadataBase: new URL(siteurl),
	title: "plottwist.",
	description: "Choose your story.",
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

	return (
		<html lang="en" className={GeistSans.className}>
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com"></link>
				<link rel="preconnect" href="https://fonts.gstatic.com"></link>
				<link href="https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet"></link>
				<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
			</Head>
			<body className="bg-[url('/gif4.gif')] bg-background bg-cover bg-fixed bg-no-repeat bg-center text-foreground">
				<main className="flex flex-col items-center min-h-screen">
					<ThemeProvider
						attribute="class"
						defaultTheme="dark"
						enableSystem
						disableTransitionOnChange
					>
						<Header email={user?.email} />
						{children}
					</ThemeProvider>
				</main>
			</body>
		</html>
	)
}