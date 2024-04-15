import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import AuthButton from "./AuthButton";

export default function ProfileDropdown({ email }: { email: string }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="px-4 py-2 dark:bg-secondary dark:hover:bg-neutral-900 bg-gray-100 hover:bg-gray-200 rounded-md">
                {email}
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
