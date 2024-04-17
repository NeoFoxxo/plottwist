"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";

type BOOKMARK_INPUT_TYPES = {
    scenario: {
        created_at: string;
        follow_count: number;
        id: number;
        prompt: string | null;
        story: string | null;
        title: string;
        user_id: string;
    };
};

export default function BookmarksCard({ scenario }: BOOKMARK_INPUT_TYPES) {
    return (
        <Card className="max-w-sm overflow-hidden">
            <CardHeader>
                <CardTitle className="line-clamp-1">{scenario.title}</CardTitle>
                <CardDescription className="line-clamp-1">
                    {scenario.prompt}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="line-clamp-4">{scenario.story}</p>
            </CardContent>
            <CardFooter>
                <p>Bookmarked on: {scenario.created_at}</p>
            </CardFooter>
        </Card>
    );
}
