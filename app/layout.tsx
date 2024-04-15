import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { siteurl } from "@/utils/siteurl";
import { createClient } from "@/utils/supabase/server";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { headers } from 'next/headers';
import Head from "next/head";

export const metadata = {
    metadataBase: new URL(siteurl),
    title: "plottwist",
    description: "Generate your own story.",
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

    const headersList = headers();
    const fullUrl = headersList.get('referer')
    const lastIndex = fullUrl?.split('/')?.pop()

    return (
        <html lang="en" className={GeistSans.className}>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com"></link>
                <link rel="preconnect" href="https://fonts.gstatic.com"></link>
                <link href="https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet"></link>
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
                        <Footer isLandPage={lastIndex == ''} />
                    </ThemeProvider>
                </main>
            </body>
        </html>
    );
}
