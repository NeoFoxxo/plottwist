"use client"
import { Trash } from "lucide-react"
import { Button } from "./ui/button"
import deleteReview from "@/utils/actions/database/deleteReview"
export default function DeleteReview({ comment }: { comment: string }) {
    return (
        <Button onClick={async () => { await deleteReview(comment); window.location.reload() }} variant={'ghost'}>
            <Trash className="h-4 w-4 p-0"></Trash>
        </Button>
    )
}
