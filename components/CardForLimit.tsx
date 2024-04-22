"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CardForLimit({ stories }: { stories: number }) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [stories]);

  return (
    <Card className="mb-4 border-none overflow-hidden bg-black/50">
      <div className="hidden opacity-0 max-lg:block max-lg:opacity-100 lg:group-hover:block lg:group-hover:opacity-100">
        <CardHeader className="text-2xl font-bold">
          <h2>{stories}/10 Stories Generated</h2>
        </CardHeader>
        <CardContent className="hidden opacity-0 max-lg:block max-lg:opacity-100 lg:group-hover:block lg:group-hover:opacity-100">
          <p className="text-xs">This limit will be reset at 12AM EST.</p>
        </CardContent>
      </div>
      <div className="block opacity-100 max-lg:block max-lg:opacity-100 lg:group-hover:hidden lg:group-hover:opacity-0 text-center mx-auto">
        {stories}/10
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: stories?.toString() + "0%" }}
        ></div>
      </div>
    </Card>
  );
}
