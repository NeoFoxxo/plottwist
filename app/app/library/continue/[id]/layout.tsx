import ReactQueryProvider from "@/lib/ReactQueryProvider";

const ContinueLayout = ({ children }: { children: React.ReactNode }) => {
    return <ReactQueryProvider>{children}</ReactQueryProvider>;
};

export default ContinueLayout;
