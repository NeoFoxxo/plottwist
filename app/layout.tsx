import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { siteurl } from "@/utils/siteurl";
import { createClient } from "@/utils/supabase/server";
import { GeistSans } from "geist/font/sans";
import { redirect } from "next/navigation";
import "./globals.css";

export const metadata = {
    metadataBase: new URL(siteurl),
    title: "Plot Twist",
    description: "Choose your own adventure story generator",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

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
                        <Header email={user.email} />
                        {children}
                        <Footer />
                    </ThemeProvider>
                </main>
            </body>
        </html>
    );
}
