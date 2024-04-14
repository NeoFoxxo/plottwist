import { ThemeProvider } from "@/components/ThemeProvider";
import { siteurl } from "@/utils/siteurl";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata = {
    metadataBase: new URL(siteurl),
    title: "Plot Twist",
    description: "Choose your own adventure story generator",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={GeistSans.className}>
            <body className="bg-background text-foreground">
                <main className="flex flex-col items-center min-h-screen">
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                    </ThemeProvider>
                </main>
            </body>
        </html>
    );
}
