"use client";
import { getUserBookmarks } from "@/utils/actions/database/getUserBookmarks";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import BookmarksCard from "./BookmarksCard";
import { story } from "./DashboardMobile";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationNext,
    PaginationPrevious
} from "./ui/pagination";

export function PaginateBookmarks({ userId, userInfo }: {
    userId: string
    userInfo: {
        data: {
            admin: boolean;
            bio: string | null;
            created_at: string;
            email: string;
            id: number;
            image: string | null;
            links: string[];
            name: string;
            normalised_name: string | null;
            star_array: string[];
            star_count: number;
            stories_created_today: number;
            user_id: string;
        };
        stories: number;
    }
}) {
    const [bookmarks, setBookmarks] = useState([]);
    const [currentSlice, setCurrentSlice] = useState(1);

    useEffect(() => {
        async function getBookmarks() {
            const result: any = await getUserBookmarks(userId, currentSlice);
            setBookmarks(result);
        }
        getBookmarks();
    }, [currentSlice]);

    const handleState = (condition: string) => {
        if (condition === "increment") {
            if (currentSlice === bookmarks.length) return;
            setCurrentSlice(current => current + 1);
        } else {
            if (currentSlice === 1) return;
            setCurrentSlice(current => current - 1);
        }
    }


    return (
        <section className="flex flex-wrap items-center justify-center w-full gap-10 py-16">
            {bookmarks.length > 0 ? (
                <div className="flex flex-wrap justify-center w-full sm:gap-y-32 gap-y-48 md:justify-start">
                    {bookmarks.map((story: story) => (
                        <BookmarksCard
                            key={story.id}
                            data={userInfo}
                            scenario={story}
                        />
                    ))}
                </div>
            ) : <p className="text-lg font-medium">You have no bookmarks, try saving something from the dashboard!</p>}
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