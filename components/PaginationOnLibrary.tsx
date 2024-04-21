"use client";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationNext,
    PaginationPrevious
} from "./ui/pagination";
import { useEffect, useState } from "react";
import { story } from "./DashboardMobile";
import { Loader2 } from "lucide-react";
import { LibraryCard } from "./LibraryCard";
import getPinnedStories from "@/utils/actions/database/getPinnedStories";

export function PaginationOnLibrary({ userId }: { userId: string }) {
    const [stories, setStories] = useState([]);
    const [currentSlice, setCurrentSlice] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getStories() {
            const result: any = await getPinnedStories(userId, currentSlice);
            setStories(result);
            setIsLoading(false);
        }
        getStories();
    }, [currentSlice]);

    const handleState = (condition: string) => {
        if (condition === "increment") {
            if (!stories[1]) {
                return;
            }
            setCurrentSlice(slice => slice + 1);
        } else {
            if (currentSlice > 0) {
                setCurrentSlice(slice => slice - 1);
            }
        }
    }

    return (
        <section>
            <div className="flex flex-wrap items-start justify-start py-12 gap-y-24">
                {!isLoading ? (
                    <>
                        {stories.length ?
                            stories.map((story: story) => (
                                <LibraryCard scenario={story} />
                            ))
                            : <div className="text-lg">No created stories</div>}
                    </>
                ) : <Loader2 size={34} className="mx-auto my-20 animate-spin" />}
            </div>
            <Pagination className="pt-6">
                <PaginationContent>
                    <PaginationItem onClick={() => handleState("decrement")}>
                        <PaginationPrevious />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem onClick={() => handleState("increment")}>
                        <PaginationNext />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </section>
    )
}