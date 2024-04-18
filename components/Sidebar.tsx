import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
	BarChartBig,
	Bookmark,
	LayoutDashboard,
	LibraryBig,
	SquarePen,
} from "lucide-react"
import Link from "next/link"

export function Sidebar() {
	const links = [
		{
			text: "Dashboard",
			href: "/app",
			icon: <LayoutDashboard className="w-5 h-5" />,
		},
		{
			text: "Charts",
			href: "/app/charts",
			icon: <BarChartBig className="w-5 h-5" />,
		},
		{
			text: "My Library",
			href: "/app/library",
			icon: <LibraryBig className="w-5 h-5" />,
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
	]

	return (
		<div className="group transition-all ease-in-out delay-150 w-[70px] hover:w-80 bg-zinc-950 z-50 fixed top-16 left-0 flex flex-col justify-between h-[100vh] px-3 max-lg:hidden border-r border-[rgba(255,255,255,0.15)] duration-300">
			<nav className="flex flex-col gap-4 mt-4">
				{links.map((link) => (
					<Link
						href={link.href}
						className={cn(
							buttonVariants({ variant: "ghost" }),
							"flex justify-start items-center gap-3 px-3 py-2 text-base hover:bg-secondary overflow-hidden"
						)}
					>
						<span className="block">{link.icon}</span>
						<span className="hidden opacity-0 group-hover:block group-hover:opacity-100">
							{link.text}
						</span>
					</Link>
				))}
			</nav>
		</div>
	)
}
