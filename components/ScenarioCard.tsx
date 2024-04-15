"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import Link from "next/link";
import { Bookmark, Check } from "lucide-react";
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

function truncateString(str: string, maxl: number) {
    // Trim any leading or trailing spaces
    str?.trim();

    if (str?.length > maxl) {
        // Find the index of the last space before the 120th character
        let lastSpaceIndex = str.lastIndexOf(' ', maxl);
        // If no space is found, truncate at 120th character
        let endIndex = lastSpaceIndex === -1 ? maxl : lastSpaceIndex;

        return str.substring(0, endIndex).trim() + " ...";
    } else {
        return str;
    }
}

export function ScenarioCard({ scenario }: SCENARIO_TYPES) {
    const { title, prompt, story } = scenario;

    return (
        <CardContainer className="inter-var">
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black/50 dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[25rem] max-w-[25rem] max-h-[23rem] rounded-xl p-7 m-3 border flex flex-col">
                <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                    {title}
                </CardItem>
                <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-400 text-xs max-w-sm mt-2 dark:text-neutral-400/80 hover:dark:text-neutral-400/100"
                >
                    {truncateString(story!!, 180)}
                </CardItem>
                <CardItem
                    as="p"
                    translateZ="60"
                    style={{
                        backgroundColor: 'rgba(0,0,0,0.700)',
                        borderRadius: '1em',
                        fontSize: '0.60rem',
                        lineHeight: '1rem',
                        overflowWrap: 'break-word',
                    }}
                    className="text-neutral-600 p-2 font-mono text-xs w-[100%] my-4 dark:text-neutral-500 hover:dark:text-neutral-300"
                >
                    Prompt: ``{prompt}``
                </CardItem>
                <div className="flex justify-between items-center mt-auto">

                    <CardItem
                        translateZ={20}
                        as={Link}
                        href=""
                        target="_blank"
                        style={{ borderRadius: '1em' }}
                        className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white bg-transparent hover:bg-white/20 "
                    >
                        Remix →
                    </CardItem>
                    <CardItem
                        translateZ={20}
                        as="button"
                        style={{ borderRadius: '1em' }}
                        className="px-4 py-2 rounded-x bg-transparent hover:bg-white/20 text-xs font-bold"
                    >
                        <Bookmark className="size-4"></Bookmark>
                    </CardItem>
                </div>
            </CardBody>
        </CardContainer>
    );
}


/*
<CardItem translateZ="100" className="w-full mt-4">
                    <Image
                        src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        height="1000"
                        width="1000"
                        className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                        alt="thumbnail"
                    />
                </CardItem>
*/