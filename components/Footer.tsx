export default function Footer({ isLandPage }: { isLandPage: boolean }) {
	return (
		<footer style={{ position: isLandPage ? 'inherit' : 'fixed' }} className="bottom-0 bg-black/25 h-16 flex justify-center w-full p-8 text-xs text-center border-t border-t-foreground/10">
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
				{" & "}
				<a
					href="https://smythos.com"
					target="_blank"
					className="font-bold hover:underline"
					rel="noreferrer"
				>
					SmythOS
				</a>
			</p>
		</footer>
	)
}
