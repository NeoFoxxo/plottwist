"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { removeBookmark } from "@/utils/actions/database/removeBookmark";
import { addBookmark } from "@/utils/actions/database/addBookmark";
import { Bookmark, Loader2, Trash } from "lucide-react";

export default function BookmarkedButton(
    { storyId, isBookmarked
    }: { storyId: number, isBookmarked: boolean }
) {
    const [isLoading, setIsLoading] = useState(false);

    const handleAddBookmark = async (isBookmark: boolean) => {
        setIsLoading(true);
        if (isBookmark) {
            await removeBookmark(storyId);
        } else {
            await addBookmark(storyId);
        }
        window.location.reload();
    };

    return (
        <Button variant={"outline"}
            onClick={
                () => {
                    handleAddBookmark(isBookmarked)
                }
            }
        >
            {isBookmarked ? (
                isLoading ? (
                    <Loader2 className="animate-spin h-4 w-4 mx-4 my-2" />
                ) : <Trash className="size-4 mx-4 my-2" />
            ) : (
                isLoading ? (
                    <Loader2 className="animate-spin h-4 w-4 mx-4 my-2" />
                ) : <Bookmark className="size-4 mx-4 my-2" />
            )}
        </Button>
    )
}