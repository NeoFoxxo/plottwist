import { GeistSans } from "geist/font/sans"
import "./globals.css"
import { siteurl } from "@/utils/siteurl"

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
				<main className="min-h-screen flex flex-col items-center">
					{children}
				</main>
			</body>
		</html>
	)
}
