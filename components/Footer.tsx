"use client";

import { usePathname } from "next/navigation";
import { CSSProperties } from "react";

export default function Footer() {
    const pathname = usePathname();

    let footerStyle: CSSProperties = {
        position: "fixed",
    };

    // if we are on the landing page do not make the footer fixed
    if (pathname === "/") {
        footerStyle = {};
    }

    return (
        <footer
            style={footerStyle}
            className="bottom-0 bg-black/25 h-8 flex justify-center items-center w-full p-6 text-xs text-center border-t border-t-foreground/10"
        >
            <p>
                Powered by{" "}
                <a
                    href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                    target="_blank"
                    className="font-bold hover:underline"
                    rel="noreferrer"
                >
                    Supabase
                </a>
                {" & "}
                <a
                    href="https://smythos.com"
                    target="_blank"
                    className="font-bold hover:underline"
                    rel="noreferrer"
                >
                    SmythOS
                </a>
            </p>
        </footer>
    );
}
