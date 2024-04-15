import Footer from "@/components/Footer";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { AlignJustify } from "lucide-react";

const DashboardLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="flex justify-center w-full min-h-[84vh]">
            <Sidebar />
            {children}
            <Footer></Footer>
        </div>
    )
}

export default DashboardLayout;