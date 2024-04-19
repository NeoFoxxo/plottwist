"use client";

import { removeBookmark } from "@/utils/actions/database/removeBookmark";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { Loader2, MessageSquareText, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";

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
    };
  };
};

export default function BookmarksCard({ scenario, data }: BOOKMARK_INPUT_TYPES) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleRemoveBookmark = async () => {
    setIsLoading(true);
    await removeBookmark(scenario.id);
    router.refresh();
  };

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
    <CardContainer className="inter-var my-7 h-[10rem] p-4">
      <CardBody
        className={`group/card relative bg-gray-50 shadow-2xl transition-all dark:bg-black/50 ${bordercolor[r]} ${shadowcolor[r]} m-10 my-auto flex h-auto w-auto max-w-[25rem] flex-col rounded-xl border p-7 hover:border-white max-md:h-auto sm:w-[25rem]`}>
        <CardItem translateZ="30">
          <div className="mb-2 flex flex-row">
            <a href="" className="m-auto h-[fit-content] w-[fit-content] p-0">
              <Image className="h-7 w-7 rounded-full" src={data.data!!.image!!} alt="bookmark"></Image>
            </a>
            <a href="" className="m-auto h-auto w-[fit-content] p-0">
              <p className="ml-2 text-sm hover:underline">{data.data.name}</p>
            </a>
          </div>
        </CardItem>
        <CardItem
          href={`/story/${scenario.id}`}
          as="a"
          style={{ cursor: "pointer" }}
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white">
          {scenario.title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="mt-2 max-w-sm text-xs text-neutral-400 dark:text-neutral-400/80 hover:dark:text-neutral-400/100">
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
          className="my-4 w-[100%] p-2 font-mono text-[0.6rem] text-neutral-600 transition-all duration-1000 ease-in-out hover:text-[0.8rem] dark:text-neutral-500 hover:dark:text-neutral-300">
          Prompt: {scenario.prompt}
        </CardItem>
        <div className="mt-auto flex items-center justify-between">
          <CardItem
            translateZ={74}
            as={Link}
            href={`/story/${scenario.id}`}
            style={{ borderRadius: "1em" }}
            className="rounded-xl bg-transparent px-4 py-2 text-xs font-normal hover:bg-white/20 dark:text-white ">
            Remix →
          </CardItem>
          <CardItem translateZ={70}>
            <div className="mt-auto flex justify-end">
              <CardItem
                as="a"
                href="/b"
                style={{ borderRadius: "1em" }}
                className="rounded-x mr-2 bg-transparent text-xs font-bold hover:bg-white/20">
                <TooltipProvider delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger>
                      <MessageSquareText className="mx-4 my-2 size-4"></MessageSquareText>
                    </TooltipTrigger>
                    <TooltipContent
                      className="m-0 border-none bg-transparent p-0 font-mono text-xs font-extralight outline-none"
                      side="bottom">
                      <p>Add a review</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardItem>
              <CardItem
                as="a"
                style={{ borderRadius: "1em" }}
                className=" rounded-x bg-transparent text-xs font-bold hover:bg-white/20">
                <TooltipProvider delayDuration={300}>
                  <Tooltip>
                    {isLoading ? (
                      <Loader2 className="mx-4 my-2 h-4 w-4 animate-spin" />
                    ) : (
                      <TooltipTrigger onClick={handleRemoveBookmark}>
                        <Trash className="mx-4 my-2 size-4" />
                      </TooltipTrigger>
                    )}
                    <TooltipContent
                      className="m-0 border-none bg-transparent p-0 font-mono text-xs font-extralight outline-none"
                      side="bottom">
                      <p>Remove bookmark</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardItem>
            </div>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
