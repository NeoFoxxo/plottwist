"use client";
import { BotIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function RemixButton({ storyId }: { storyId: number }) {
  const [remixLoading, setRemixLoading] = useState(false);
  const router = useRouter();

  function onRemixClick() {
    setRemixLoading(true);
    router.replace(`/app/create?remix=${storyId}`);
  }

  return (
    <div className="items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 py-2 flex gap-2.5 px-4">
      {remixLoading ? (
        <Loader2 className="animate-spin h-4 w-4 mx-4 my-2" />
      ) : (
        <BotIcon
          className="size-5 mx-4 my-2"
          onClick={() => {
            onRemixClick();
          }}
        />
      )}
    </div>
  );
}
