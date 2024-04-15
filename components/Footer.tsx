export default function Footer() {
	return (
		<footer className="bottom-0 flex justify-center w-full p-8 text-xs text-center border-t border-t-foreground/10">
			<p>
				Powered by{" "}
				<a
					href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
					target="_blank"
					className="font-bold hover:underline"
					rel="noreferrer"
				>
					Supabase
				</a>
			</p>
		</footer>
	)
}
