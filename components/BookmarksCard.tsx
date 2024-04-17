"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { Globe, Loader2, MessageSquareText, Trash } from "lucide-react";
import Link from "next/link";

type BOOKMARK_INPUT_TYPES = {
    scenario: {
        created_at: string;
        follow_count: number;
        id: number;
        prompt: string | null;
        story: string | null;
        title: string;
        user_id: string;
    },
    data: {
        data: {
            admin: boolean;
            bio: string | null;
            created_at: string;
            email: string;
            id: number;
            image: string | null;
            links: string[] | null;
            name: string | null;
            user_id: string;
        }
    },
};

export default function BookmarksCard({ scenario, data }: BOOKMARK_INPUT_TYPES) {

    function relativeTime(timestamp: string) {
        const currentTime: any = new Date();
        const providedTime: any = new Date(timestamp);
        const timeDifference = currentTime - providedTime;
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);

        if (weeks > 0) {
            return weeks + "w";
        } else if (days > 0) {
            return days + "d";
        } else if (hours > 0) {
            return hours + "h";
        } else if (minutes > 0) {
            return minutes + "m";
        } else {
            return seconds + "s";
        }
    }

    const shadowcolor = [
        "hover:shadow-emerald-500/[0.4]",
        "hover:shadow-orange-400/[0.6]",
        "hover:shadow-blue-600/[0.6]",
        "hover:shadow-cyan-400/[0.6]",
        "hover:shadow-violet-500/[0.4]",
        "hover:shadow-red-300/[0.4]",
    ];

    const bordercolor = [
        "border-emerald-500/[0.6]",
        "border-orange-500/[0.6]",
        "border-blue-500/[0.6]",
        "border-cyan-500/[0.6]",
        "border-violet-500/[0.6]",
        "border-red-300/[0.6]",
    ];

    function truncateString(str: string, maxl: number) {
        // Trim any leading or trailing spaces
        str?.trim();

        if (str?.length > maxl) {
            // Find the index of the last space before the 120th character
            let lastSpaceIndex = str.lastIndexOf(" ", maxl);
            // If no space is found, truncate at 120th character
            let endIndex = lastSpaceIndex === -1 ? maxl : lastSpaceIndex;

            return str.substring(0, endIndex).trim() + " ...";
        } else {
            return str;
        }
    }

    const r = Math.floor(Math.random() * shadowcolor.length);

    return (
        <CardContainer className="inter-var h-[10rem] p-4 my-7">
            <CardBody className={`transition-all bg-gray-50 relative group/card shadow-2xl dark:bg-black/50 ${bordercolor[r]} ${shadowcolor[r]} hover:border-white w-auto h-auto max-md:h-auto my-auto sm:w-[25rem] max-w-[25rem] rounded-xl p-7 m-10 border flex flex-col`}>
                <CardItem translateZ="30">
                    <div className="flex flex-row mb-2">
                        <a href="" className="h-[fit-content] w-[fit-content] m-auto p-0">
                            <img className="rounded-full w-7 h-7" src={data.data!!.image!!}></img>
                        </a>
                        <a href="" className="h-auto w-[fit-content] m-auto p-0">
                            <p className="text-sm ml-2 hover:underline">{data.data.name}</p>
                        </a>
                    </div>
                </CardItem>
                <CardItem
                    href={`/story/${scenario.id}`}
                    as="a"
                    style={{ cursor: "pointer" }}
                    translateZ="50"
                    className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                    {scenario.title}
                </CardItem>
                <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-400 text-xs max-w-sm mt-2 dark:text-neutral-400/80 hover:dark:text-neutral-400/100"
                >
                    {truncateString(scenario.story!!, 180)}
                </CardItem>
                <CardItem
                    as="p"
                    translateZ={60}
                    style={{
                        backgroundColor: "rgba(0,0,0,0.700)",
                        borderRadius: "1em",
                        lineHeight: "1rem",
                        overflowWrap: "break-word",
                    }}
                    className="text-neutral-600 p-2 transition-all duration-1000 ease-in-out font-mono text-[0.6rem] hover:text-[0.8rem] w-[100%] my-4 dark:text-neutral-500 hover:dark:text-neutral-300"
                >
                    Prompt: {scenario.prompt}
                </CardItem>
                <div className="flex justify-between items-center mt-auto">
                    <CardItem
                        translateZ={74}
                        as={Link}
                        href={`/story/${scenario.id}`}
                        style={{ borderRadius: "1em" }}
                        className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white bg-transparent hover:bg-white/20 "
                    >
                        Remix →
                    </CardItem>
                    <CardItem translateZ={70}>
                        <div className="flex justify-end mt-auto">
                            <CardItem
                                as="a"
                                href="/b"
                                style={{ borderRadius: "1em" }}
                                className="mr-2 rounded-x bg-transparent hover:bg-white/20 text-xs font-bold"
                            >
                                <TooltipProvider delayDuration={300}>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <MessageSquareText className="size-4 mx-4 my-2"></MessageSquareText>
                                        </TooltipTrigger>
                                        <TooltipContent
                                            className="p-0 m-0 border-none outline-none font-mono bg-transparent text-xs font-extralight"
                                            side="bottom"
                                        >
                                            <p>Add a review</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </CardItem>
                            <CardItem
                                as="a"
                                href="/b"
                                style={{ borderRadius: "1em" }}
                                className=" rounded-x bg-transparent hover:bg-white/20 text-xs font-bold"
                            >
                                <TooltipProvider delayDuration={300}>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Trash className="size-4 mx-4 my-2" />
                                        </TooltipTrigger>
                                        <TooltipContent
                                            className="p-0 m-0 border-none outline-none font-mono bg-transparent text-xs font-extralight"
                                            side="bottom"
                                        >
                                            <p>Remove bookmark</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </CardItem>
                        </div>
                    </CardItem>
                </div>
            </CardBody>
        </CardContainer >
    );
}
