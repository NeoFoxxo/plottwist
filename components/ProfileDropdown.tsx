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

export default function ProfileDropdown({ email }: { email: string }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="flex justify-center items-center bg-primary text-black px-4 py-2 gap-2 text-md rounded-md hover:bg-neutral-200">
                    {email} <ChevronDown className="w-4 h-4 -mr-1" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/profile">
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
