"use client";
import { getUserStories } from "@/utils/actions/database/getUserStories";
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
import { ProfileCard } from "./ProfileCard";
import { Loader2 } from "lucide-react";

export function PaginateStories({ userId }: { userId: string }) {
    const [stories, setStories] = useState([]);
    const [currentSlice, setCurrentSlice] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getStories() {
            const result: any = await getUserStories(userId, currentSlice);
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
            <div className="flex flex-wrap justify-center pl-2 mx-auto max-w-7xl">
                {!isLoading ? (
                    <>
                        {
                            stories.map((story: story) => (
                                <ProfileCard scenario={story} />
                            ))
                        }
                    </>
                ) : <Loader2 size={34} className="my-20 animate-spin" />}
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