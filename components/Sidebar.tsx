import {
	Card,
	CardContent,
	CardFooter,
	CardHeader
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import Link from "next/link";

import { BarChartBig, Bookmark, Home, LayoutDashboard, SquarePen } from "lucide-react";

export function Sidebar() {

	const links = [
		{
			text: "Dashboard",
			href: "/app",
			icon: <LayoutDashboard className="w-5 h-5" />
		},
		{
			text: "Statistics",
			href: "/app/stats",
			icon: <BarChartBig className="w-5 h-5" />
		},
		{
			text: "Bookmarks",
			href: "/app/bookmarks",
			icon: <Bookmark className="w-5 h-5" />
		},
		{
			text: "Create",
			href: "/app/create",
			icon: <SquarePen className="w-5 h-5" />
		},
	]

	return (
		<div style={{ height: 'calc(100vh - 112px)', overflowY: 'auto', borderRight: 'solid 1px rgba(255,255,255,0.150)' }} className="sidebar flex flex-col justify-between min-h-20 px-3 bg-black/30 w-80 max-lg:hidden">
			<nav className="flex flex-col gap-4 mt-4">
				{links.map((link) => (
					<Link href={link.href} className={cn(buttonVariants({ variant: "ghost" }), "flex justify-start items-center gap-3 px-3 py-2 text-base hover:bg-white/20")}>
						{link.icon}
						{link.text}
					</Link>
				))}
			</nav>
			<Card className="mb-4 border-none bg-black/50">
				<CardHeader className="text-2xl font-bold">
					Upgare to Pro plan
				</CardHeader>
				<CardContent>
					Unlock all features and get unlimited access to our support team.
				</CardContent>
				<CardFooter>
					<Button style={{ border: 'solid rgba(255,255,255,0.650) 1px' }} variant={"ghost"} className="w-full">
						Upgrade
					</Button>
				</CardFooter>
			</Card>
		</div>
	)
}