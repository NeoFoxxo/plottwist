import { Sidebar } from "@/components/Sidebar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full mt-20 flex justify-end items-start min-h-[84vh] pl-[70px] max-sm:pl-0">
            <Sidebar />
            {children}
        </div>
    );
};

export default AppLayout;