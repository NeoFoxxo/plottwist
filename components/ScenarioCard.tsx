"use client";

import { Bookmark, MessageSquareText } from "lucide-react";
import Link from "next/link";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

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

const shadowcolor = [
    'hover:shadow-emerald-500/[0.4]',
    'hover:shadow-orange-400/[0.6]',
    'hover:shadow-blue-600/[0.6]',
    'hover:shadow-cyan-400/[0.6]',
    'hover:shadow-violet-500/[0.4]',
    'hover:shadow-red-300/[0.4]'
]

const bordercolor = [
    'border-emerald-500/[0.6]',
    'border-orange-500/[0.6]',
    'border-blue-500/[0.6]',
    'border-cyan-500/[0.6]',
    'border-violet-500/[0.6]',
    'border-red-300/[0.6]'
]

export function ScenarioCard({ scenario }: SCENARIO_TYPES) {

    const r = Math.floor(Math.random() * shadowcolor.length)

    const { title, prompt, story } = scenario;

    return (
        <CardContainer className="inter-var h-[10rem] p-4 my-7">
            <CardBody className={`transition-all bg-gray-50 relative group/card shadow-2xl dark:bg-black/50 ${bordercolor[r]} ${shadowcolor[r]} hover:border-white w-auto h-auto max-md:h-auto my-auto sm:w-[25rem] max-w-[25rem] rounded-xl p-7 m-10 border flex flex-col`}>
                <CardItem
                    href={`/story/${scenario.id}`}
                    style={{ cursor: 'pointer' }}
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
                    translateZ={60}
                    style={{
                        backgroundColor: 'rgba(0,0,0,0.700)',
                        borderRadius: '1em',
                        lineHeight: '1rem',
                        overflowWrap: 'break-word',
                    }}
                    className="text-neutral-600 p-2 transition-all duration-1000 ease-in-out font-mono text-[0.4em] hover:text-[0.5em] w-[100%] my-4 dark:text-neutral-500 hover:dark:text-neutral-300"
                >
                    Prompt: {prompt}
                </CardItem>
                <div className="flex justify-between items-center mt-auto">
                    <CardItem
                        translateZ={70}
                        as={Link}
                        href={`/story/${scenario.id}`}
                        style={{ borderRadius: '1em' }}
                        className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white bg-transparent hover:bg-white/20 "
                    >
                        Remix →
                    </CardItem>
                    <div className="flex justify-end mt-auto">
                        <CardItem
                            translateZ={70}
                            as="a"
                            href="/b"
                            style={{ borderRadius: '1em' }}
                            className="mr-2 rounded-x bg-transparent hover:bg-white/20 text-xs font-bold"
                        >
                            <TooltipProvider delayDuration={300} >
                                <Tooltip>
                                    <TooltipTrigger >
                                        <MessageSquareText className="size-4 mx-4 my-2"></MessageSquareText>
                                    </TooltipTrigger>
                                    <TooltipContent className='p-0 m-0 border-none outline-none font-mono bg-transparent text-xs font-extralight' side='bottom'>
                                        <p>Add a review</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </CardItem>
                        <CardItem
                            translateZ={70}
                            as="a"
                            href="/b"
                            style={{ borderRadius: '1em' }}
                            className=" rounded-x bg-transparent hover:bg-white/20 text-xs font-bold"
                        >
                            <TooltipProvider delayDuration={300} >
                                <Tooltip>
                                    <TooltipTrigger >
                                        <Bookmark className="size-4 mx-4 my-2"></Bookmark>
                                    </TooltipTrigger>
                                    <TooltipContent className='p-0 m-0 border-none outline-none font-mono bg-transparent text-xs font-extralight' side='bottom'>
                                        <p>Add to library</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </CardItem>
                    </div>
                </div>
            </CardBody>
        </CardContainer>
    );
}
