import {
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import Link from "next/link";

import { BarChartBig, Bookmark, Home, SquarePen } from "lucide-react";

export function Sidebar() {
    const links = [
        {
            text: "Dashboard",
            href: "/dashboard",
            icon: <Home className="w-5 h-5" />
        },
        {
            text: "Statistics",
            href: "/dashboard/stats",
            icon: <BarChartBig className="w-5 h-5" />
        },
        {
            text: "Bookmarks",
            href: "/dashboard/bookmarks",
            icon: <Bookmark className="w-5 h-5" />
        },
        {
            text: "Create",
            href: "/dashboard/create",
            icon: <SquarePen className="w-5 h-5" />
        },
    ]

    return (
        <div className="flex flex-col justify-between min-h-full px-3 bg-neutral-700/10 w-80 max-lg:hidden">
            <nav className="flex flex-col gap-4 mt-4">
                {links.map((link) => (
                    <Link href={link.href} className={cn(buttonVariants({ variant: "ghost" }), "flex justify-start items-center gap-3 px-3 py-2 text-lg")}>
                        {link.icon}
                        {link.text}
                    </Link>
                ))}
            </nav>
            <Card className="mb-4 border-none">
                <CardHeader className="text-2xl font-bold">
                    Upgare to Pro plan
                </CardHeader>
                <CardContent>
                    Unlock all features and get unlimited access to our support team.
                </CardContent>
                <CardFooter>
                    <Button variant={"outline"} className="w-full">
                        Upgrade
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}