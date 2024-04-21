"use client";
import { getUserBookmarks } from "@/utils/actions/database/getUserBookmarks";
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
import BookmarksCard from "./BookmarksCard";
import { Loader2 } from "lucide-react";
import getUserInfo from "@/utils/actions/database/getUserinfo";

export function PaginateBookmarks({ userId }: { userId: string }) {
    const [bookmarks, setBookmarks] = useState([]);
    const [currentSlice, setCurrentSlice] = useState(0);

    useEffect(() => {
        async function getBookmarks() {
            const result: any = await getUserBookmarks(userId, currentSlice);
            setBookmarks(result);
        }
        getBookmarks();
    }, [currentSlice]);

    const handleState = (condition: string) => {
        if (condition === "increment") {
            if (!bookmarks[1]) {
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
        <section className="flex flex-wrap items-center justify-center w-full gap-10">
            <div className="flex flex-wrap justify-start w-full items start"></div>
            {bookmarks.map(async (story: story) => (
                <BookmarksCard
                    key={story.id}
                    data={await getUserInfo(story.user_id)}
                    scenario={story}
                />
            ))}
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