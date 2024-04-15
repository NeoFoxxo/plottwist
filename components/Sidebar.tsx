import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import Link from "next/link";

import {
    BarChartBig,
    Bookmark,
    LayoutDashboard,
    SquarePen,
} from "lucide-react";

export function Sidebar() {
    const links = [
        {
            text: "Dashboard",
            href: "/app",
            icon: <LayoutDashboard className="w-5 h-5" />,
        },
        {
            text: "Statistics",
            href: "/app/stats",
            icon: <BarChartBig className="w-5 h-5" />,
        },
        {
            text: "Bookmarks",
            href: "/app/bookmarks",
            icon: <Bookmark className="w-5 h-5" />,
        },
        {
            text: "Create",
            href: "/app/create",
            icon: <SquarePen className="w-5 h-5" />,
        },
    ];

    return (
        <div className="sidebar flex-col justify-between min-h-[84vh] max-w-64 md:px-3 bg-black/30 w-80 border-r border-secondary hidden md:flex">
            <nav className="flex flex-col gap-4 mt-4">
                {links.map((link) => (
                    <Link
                        href={link.href}
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "flex justify-start items-center gap-3 px-3 py-2 text-base hover:bg-white/20"
                        )}
                    >
                        {link.icon}
                        {link.text}
                    </Link>
                ))}
            </nav>
        </div>
    );
}
