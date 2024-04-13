import Footer from "@/components/Footer"
import AuthButton from "../components/AuthButton"
import Header from "@/components/Header"
import { ModeToggle } from "@/components/ModeToggle"

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
			</div>
			<Footer />
		</div>
	)
}
