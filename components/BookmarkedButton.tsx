"use client";
import { addBookmark } from "@/utils/actions/database/addBookmark";
import { removeBookmark } from "@/utils/actions/database/removeBookmark";
import { Bookmark } from "lucide-react";
import { useState } from "react";

export default function BookmarkedButton({
  storyId,
  isBookmarked,
  bookmarkCount,
}: {
  storyId: number;
  isBookmarked: boolean;
  bookmarkCount: number;
}) {
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [fakeBmrkCount, setFakeBmrkCount] = useState(bookmarkCount);

  const handleAddBookmark = async () => {
    if (bookmarked) {
      setFakeBmrkCount((fakeBmrkCount) => fakeBmrkCount - 1);
      setBookmarked(false);
      await removeBookmark(storyId);
    } else {
      setFakeBmrkCount((fakeBmrkCount) => fakeBmrkCount + 1);
      setBookmarked(true);
      await addBookmark(storyId);
    }
  };

  return (
    <div
      className="items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 py-2 flex gap-0 px-4"
      onClick={() => {
        handleAddBookmark();
      }}
    >
      {bookmarked ? (
        <>
          <Bookmark className="mx-4 my-2 size-4" fill="white" />
          <p className="mr-5">{fakeBmrkCount}</p>
        </>
      ) : (
        <>
          <Bookmark className="mx-4 my-2 size-4" />
          <p className="mr-5">{fakeBmrkCount}</p>
        </>
      )}
    </div>
  );
}
