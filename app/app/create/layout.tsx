import ReactQueryProvider from "@/lib/ReactQueryProvider"

const CreateLayout = ({ children }: { children: React.ReactNode }) => {
	return <ReactQueryProvider>{children}</ReactQueryProvider>
}

export default CreateLayout
