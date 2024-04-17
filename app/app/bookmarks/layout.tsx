import { Sidebar } from "@/components/Sidebar";

const BookmarksLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full mt-10 flex justify-start items-start min-h-[84vh] pl-[70px]">
            <Sidebar />
            {children}
        </div>
    );
};

export default BookmarksLayout;
