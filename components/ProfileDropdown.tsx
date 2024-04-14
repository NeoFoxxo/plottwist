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
                <DropdownMenuItem>
                    <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="/dashboard/create">Create +</Link>
                </DropdownMenuItem>
                <AuthButton />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
