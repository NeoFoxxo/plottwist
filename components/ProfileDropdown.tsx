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
import { Button } from "./ui/button";

export default function ProfileDropdown({ email }: { email: string }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button className="gap-2 text-md">
                    {email} <ChevronDown className="w-4 h-4 -mr-1" />
                </Button>
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
