import { Sidebar } from "@/components/Sidebar";

const StoryLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-[84vh] w-full items-start justify-start pl-[70px]">
      <Sidebar />
      {children}
    </div>
  );
};

export default StoryLayout;
