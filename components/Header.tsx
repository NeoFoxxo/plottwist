import Link from "next/link"

import AuthButton from "@/components/AuthButton"
import ProfileDropdown from "@/components/ProfileDropdown"

export default function Header({ email }: { email: string | undefined }) {
	return (
		<nav className="fixed bg-zinc-950 flex justify-center items-center w-full h-16 border-b border-secondary">
			<div className="w-full max-w-7xl flex p-3 items-center justify-between text-sm">
				<Link href="/">
					<div className="text-md font-semibold">
						<p
							style={{ fontFamily: "Cabin, sans-serif" }}
							className="italic text-xl"
						>
							plottwist.
						</p>
					</div>
				</Link>
				<div className="flex gap-5">
					{email ? <ProfileDropdown email={email} /> : <AuthButton />}
				</div>
			</div>
		</nav>
	)
}
