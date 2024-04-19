import { Sidebar } from "@/components/Sidebar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mt-20 flex min-h-[84vh] w-full items-start justify-start pl-[70px]">
      <Sidebar />
      {children}
    </div>
  );
};

export default AppLayout;
