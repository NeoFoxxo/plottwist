import { Sidebar } from "@/components/Sidebar";

const StoryLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full flex justify-start items-start min-h-[84vh] pl-[70px] max-sm:pl-0">
            <Sidebar />
            {children}
        </div>
    );
};

export default StoryLayout;
