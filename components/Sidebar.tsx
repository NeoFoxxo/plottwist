import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BarChartBig, Bookmark, LayoutDashboard, LibraryBig, SquarePen } from "lucide-react";
import Link from "next/link";

export function Sidebar() {
  const links = [
    {
      text: "Dashboard",
      href: "/app",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      text: "Charts",
      href: "/app/charts",
      icon: <BarChartBig className="h-5 w-5" />,
    },
    {
      text: "My Library",
      href: "/app/library",
      icon: <LibraryBig className="h-5 w-5" />,
    },
    {
      text: "Bookmarks",
      href: "/app/bookmarks",
      icon: <Bookmark className="h-5 w-5" />,
    },
    {
      text: "Create",
      href: "/app/create",
      icon: <SquarePen className="h-5 w-5" />,
    },
  ];

  return (
    <div className="group fixed left-0 top-16 z-10 flex h-[100vh] w-[70px] flex-col justify-between border-r border-[rgba(255,255,255,0.15)] bg-zinc-950 px-3 transition-all delay-150 duration-300 ease-in-out hover:w-80 max-lg:hidden">
      <nav className="mt-4 flex flex-col gap-4">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "flex items-center justify-start gap-3 overflow-hidden px-3 py-2 text-base hover:bg-secondary"
            )}>
            <span className="block">{link.icon}</span>
            <span className="hidden opacity-0 group-hover:block group-hover:opacity-100">{link.text}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
