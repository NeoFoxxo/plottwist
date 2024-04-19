import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import AuthButton from "./AuthButton";

export default function ProfileDropdown({ email, userId }: { email: string; userId: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="text-md flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-black hover:bg-neutral-200">
          {email} <ChevronDown className="-mr-1 h-4 w-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={`/profile/${userId}`}>
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </Link>
        <Link href="/app">
          <DropdownMenuItem>Dashboard</DropdownMenuItem>
        </Link>
        <Link href="/app/create">
          <DropdownMenuItem>Create +</DropdownMenuItem>
        </Link>
        <AuthButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
