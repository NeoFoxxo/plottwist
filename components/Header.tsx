import Link from "next/link"

import AuthButton from "@/components/AuthButton"
import ProfileDropdown from "@/components/ProfileDropdown"

export default function Header(
	{
		email,
		userId,
		username
	}: { email: string | undefined, username: string | any, userId: string | undefined }) {
	return (
		<nav className="fixed z-30 flex items-center justify-center w-full h-16 border-b bg-zinc-950 border-secondary">
			<div className="flex items-center justify-between w-full p-3 text-sm max-w-7xl">
				<Link href="/app">
					<div className="font-semibold text-md">
						<p
							style={{ fontFamily: "Cabin, sans-serif" }}
							className="text-xl italic"
						>
							plottwist.
						</p>
					</div>
				</Link>
				<div className="flex gap-5">
					{email && userId ? <ProfileDropdown email={email} username={username} /> : <AuthButton />}
				</div>
			</div>
		</nav>
	)
}
