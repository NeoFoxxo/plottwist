import Footer from "@/components/Footer"
import AuthButton from "../components/AuthButton"
import Header from "@/components/Header"
import { ModeToggle } from "@/components/ModeToggle"
import Link from "next/link"

export default async function Index() {
	return (
		<div className="flex flex-col items-center flex-1 w-full gap-20">
			<nav className="flex justify-center w-full h-16 border-b border-b-foreground/10">
				<div className="flex items-center justify-between w-full max-w-4xl p-3 text-sm">
					<AuthButton />
					<ModeToggle />
				</div>
			</nav>

			<div className="flex flex-col flex-1 max-w-4xl gap-20 px-3">
				<Header />

				<Link
					href="/create"
					className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
				>
					<span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
					<span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
						Create your story
					</span>
				</Link>
			</div>
			<Footer />
		</div>
	)
}
