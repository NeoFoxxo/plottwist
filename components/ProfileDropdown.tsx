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
            <DropdownMenuTrigger className="px-4 py-2 dark:bg-gray-800 dark:hover:bg-gray-900 bg-gray-100 hover:bg-gray-200 rounded-md">
                {email}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/profile">
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
                <Link href="/dashboard">
                    <DropdownMenuItem>Dashboard</DropdownMenuItem>
                </Link>
                <Link href="/dashboard/create">
                    <DropdownMenuItem>Create +</DropdownMenuItem>
                </Link>
                <AuthButton />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
