"use client";

import { Check } from "lucide-react";
import { Button } from "./ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";

type SCENARIO_TYPES = {
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

export function ScenarioCard({ scenario }: SCENARIO_TYPES) {
    const { title, prompt, story } = scenario;
    return (
        <Card className="max-w-[400px] max-h-[340px] border border-secondary">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription className="text-sm">
                    <b>Prompt:</b> {prompt}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm">{story}</p>
            </CardContent>
            <CardFooter>
                <Button className="w-full">
                    <Check className="mr-2 h-4 w-4" /> Regenerate Story
                </Button>
            </CardFooter>
        </Card>
    );
}
