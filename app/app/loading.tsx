export default function Loading() {
	return (
		<div className="flex items-center h-screen pb-20">
			<div className="relative inline-flex">
				<div className="w-24 h-24 rounded-full bg-primary"></div>
				<div className="absolute top-0 left-0 w-24 h-24 rounded-full bg-primary animate-ping"></div>
				<div className="absolute top-0 left-0 w-24 h-24 rounded-full bg-primary animate-pulse"></div>
			</div>
		</div>
	)
}