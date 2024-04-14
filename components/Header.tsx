import AuthButton from "@/components/AuthButton";
import { ModeToggle } from "@/components/ModeToggle";

export default function Header() {
	return (
		<nav className="flex justify-around items-center w-full h-16 border-b border-b-foreground/10">
			<div>
				logo here
			</div>
			<div className="flex gap-5">
				<AuthButton />
				<ModeToggle />
			</div>
		</nav>
	)
}
