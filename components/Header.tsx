import Link from "next/link";

import AuthButton from "@/components/AuthButton";
import ProfileDropdown from "@/components/ProfileDropdown";

export default function Header({ email, userId }: { email: string | undefined; userId: string | undefined }) {
  return (
    <nav className="fixed z-30 flex h-16 w-full items-center justify-center border-b border-secondary bg-zinc-950">
      <div className="flex w-full max-w-7xl items-center justify-between p-3 text-sm">
        <Link href="/app">
          <div className="text-md font-semibold">
            <p style={{ fontFamily: "Cabin, sans-serif" }} className="text-xl italic">
              plottwist.
            </p>
          </div>
        </Link>
        <div className="flex gap-5">
          {email && userId ? <ProfileDropdown email={email} userId={userId} /> : <AuthButton />}
        </div>
      </div>
    </nav>
  );
}
