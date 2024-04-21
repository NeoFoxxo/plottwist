import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getMaxStories } from "@/utils/actions/database/getMaxStories";
import { createClient } from "@/utils/supabase/server";
import { Bookmark, LayoutDashboard, LibraryBig, SquarePen } from "lucide-react";
import Link from "next/link";
import StoryLimitCard from "./StoryLimitCard";

export const links = [
  {
    text: "Dashboard",
    href: "/app",
    icon: <LayoutDashboard className="w-5 h-5" />,
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
];

export async function Sidebar() {
  const storiesData = await getMaxStories();
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="group transition-all ease-in-out delay-150 w-[70px] hover:w-80 bg-zinc-950 z-10 fixed top-16 left-0 flex flex-col justify-between h-[100vh] px-3 max-lg:hidden border-r border-[rgba(255,255,255,0.15)] duration-300">
      <nav className="flex flex-col gap-4 mt-4">
        {links.map((link, index) => (
          <Link
            key={index}
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
      {storiesData.userId && user?.aud === "authenticated" && (
        <div className="transition-all overflow-hidden mb-auto mt-10 group-hover:my-auto">
          <StoryLimitCard
            stories={storiesData!!.storyCount!!}
            userId={storiesData.userId!!}
          />
        </div>
      )}
    </div>
  );
}
