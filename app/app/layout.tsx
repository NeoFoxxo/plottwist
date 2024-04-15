import { Sidebar } from "@/components/Sidebar"

const AppLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex justify-center w-full min-h-[84vh]">
			<Sidebar />
			{children}
		</div>
	)
}

export default AppLayout
