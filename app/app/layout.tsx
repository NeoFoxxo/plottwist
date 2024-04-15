import { Sidebar } from "@/components/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex justify-start w-full min-h-[84vh]">
            <Sidebar />
            {children}
        </div>
    );
};

export default DashboardLayout;
