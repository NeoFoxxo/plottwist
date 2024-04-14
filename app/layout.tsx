import { GeistSans } from "geist/font/sans"
import "./globals.css"
import { siteurl } from "@/utils/siteurl"
import { ThemeProvider } from "@/components/ThemeProvider"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export const metadata = {
	metadataBase: new URL(siteurl),
	title: "Plot Twist",
	description: "Choose your own adventure story generator",
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" className={GeistSans.className}>
			<body className="bg-background text-foreground">
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<main className="flex flex-col items-center justify-between min-h-screen">
						<Header />
						{children}
						<Footer />
					</main>
				</ThemeProvider>
			</body>
		</html>
	)
}
