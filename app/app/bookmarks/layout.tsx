import { Sidebar } from "@/components/Sidebar";

const BookmarksLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mt-10 flex min-h-[84vh] w-full items-start justify-start pl-[70px]">
      <Sidebar />
      {children}
    </div>
  );
};

export default BookmarksLayout;
