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

export default function ProfileDropdown({ email, userId }: { email: string, userId: string }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="flex items-center justify-center gap-2 px-4 py-2 text-black rounded-md bg-primary text-md hover:bg-neutral-200">
                    {email} <ChevronDown className="w-4 h-4 -mr-1" />
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
