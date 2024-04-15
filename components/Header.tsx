import Link from "next/link";

import { ModeToggle } from "@/components/ModeToggle";
import AuthButton from "@/components/AuthButton";
import ProfileDropdown from "@/components/ProfileDropdown";

export default function Header({ email }: { email: string | undefined }) {
    return (
        <nav className="bg-black/25 flex justify-center items-center w-full h-16 border-b border-b-foreground/10">
            <div className="w-full max-w-7xl flex p-3 items-center justify-between text-sm">
                <Link href="/">
                    <div className="text-md font-semibold">
                        PLOT{" "}
                        <i className="text-teal-700 dark:text-red-200">TWIST</i>
                    </div>
                </Link>
                <div className="flex gap-5">
                    <ModeToggle />
                    {email ? <ProfileDropdown email={email} /> : <AuthButton />}
                </div>
            </div>
        </nav>
    );
}
