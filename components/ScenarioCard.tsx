"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { addBookmark } from "@/utils/actions/database/addBookmark";
import unPublish from "@/utils/actions/database/privateStory";
import publish from "@/utils/actions/database/publishStory";
import { removeBookmark } from "@/utils/actions/database/removeBookmark";
import { Bookmark, Globe, Loader2, Lock, MessageSquareText, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";

type SCENARIO_TYPES = {
  scenario: {
    choices: string[] | null;
    created_at: string;
    finished: boolean | null;
    follow_count: number;
    id: number;
    prompt: string | null;
    published: boolean | null;
    story: string | null;
    title: string;
    user_id: string;
  };
  bookmark: boolean | false;
  data: {
    data: {
      admin: boolean | null;
      bio: string | null;
      created_at: string | null;
      email: string | null;
      id: number;
      image: string | null;
      links: string[] | null;
      name: string | null;
      user_id: string;
    };
  };
  currentUser:
    | {
        user: any;
      }
    | {
        user: null;
      };
};

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

export function ScenarioCard({ scenario, bookmark, data, currentUser }: SCENARIO_TYPES) {
  const r = Math.floor(Math.random() * shadowcolor.length);
  const { title, prompt, story } = scenario;
  const [isLoading, setIsLoading] = useState(false);

  const [pending, setPending] = useState(false);
  const router = useRouter();

  // To get latest bookmarks
  useEffect(() => {
    router.refresh();
    // Do not add dependency here, this is intensional
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddBookmark = async (isBookmark: boolean) => {
    if (isBookmark) {
      setIsLoading(true);
      await removeBookmark(scenario.id);
      router.refresh();
    } else {
      setIsLoading(true);
      await addBookmark(scenario.id);
      router.refresh();
    }
  };

  return (
    <CardContainer className="inter-var my-7 h-[10rem] p-4">
      <CardBody
        className={`group/card relative bg-gray-50 shadow-2xl transition-all dark:bg-black/50 ${bordercolor[r]} ${shadowcolor[r]} m-10 my-auto flex h-auto w-auto max-w-[25rem] flex-col rounded-xl border p-7 hover:border-white max-md:h-auto sm:w-[25rem]`}>
        <div className="flex items-center justify-between">
          <CardItem translateZ="30">
            <div className="mb-2 flex flex-row">
              <a href="" className="m-auto h-[fit-content] w-[fit-content] p-0">
                <img className="h-7 w-7 rounded-full" src={data.data!!.image!!}></img>
              </a>
              <a href="" className="m-auto h-auto w-[fit-content] p-0">
                <p className="ml-2 text-sm hover:underline">{data.data.name}</p>
              </a>
            </div>
          </CardItem>
          {data.data.user_id == currentUser.user.id && (
            <CardItem>
              <p className="rounded-sm bg-green-400/40 px-1 text-sm">Yours</p>
            </CardItem>
          )}
        </div>
        <CardItem
          href={`/story/${scenario.id}`}
          as="a"
          style={{ cursor: "pointer" }}
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white">
          {title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="mt-2 max-w-sm text-xs text-neutral-400 dark:text-neutral-400/80 hover:dark:text-neutral-400/100">
          {truncateString(story!!, 180)}
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
          Prompt: {prompt}
        </CardItem>
        <div className="mt-auto flex items-center justify-between">
          <CardItem
            translateZ={74}
            as={Link}
            href={`/app/create?remix=${scenario.id}`}
            style={{ borderRadius: "1em" }}
            className="rounded-xl bg-transparent px-4 py-2 text-xs font-normal hover:bg-white/20 dark:text-white ">
            Remix →
          </CardItem>
          {data.data.user_id != currentUser.user.id ? (
            <CardItem translateZ={70}>
              <div className="mt-auto flex justify-end">
                <CardItem
                  as="a"
                  href={`/story/${scenario.id}?isReview=true`}
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
                  as="button"
                  onClick={() => {
                    handleAddBookmark(bookmark);
                  }}
                  style={{ borderRadius: "1em" }}
                  className=" rounded-x bg-transparent text-xs font-bold hover:bg-white/20">
                  <TooltipProvider delayDuration={300}>
                    <Tooltip>
                      <TooltipTrigger>
                        {bookmark ? (
                          isLoading ? (
                            <Loader2 className="mx-4 my-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Trash className="mx-4 my-2 size-4" />
                          )
                        ) : isLoading ? (
                          <Loader2 className="mx-4 my-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Bookmark className="mx-4 my-2 size-4"></Bookmark>
                        )}
                      </TooltipTrigger>
                      <TooltipContent
                        className="m-0 border-none bg-transparent p-0 font-mono text-xs font-extralight outline-none"
                        side="bottom">
                        {bookmark ? (
                          <p>Remove from bookmarks</p>
                        ) : isLoading ? (
                          <span></span>
                        ) : (
                          <p>Add to bookmarks</p>
                        )}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardItem>
              </div>
            </CardItem>
          ) : scenario.published ? (
            <CardItem
              translateZ={70}
              onClick={async () => {
                setPending(true);
                await unPublish(scenario.id);
                router.refresh();
                setPending(false);
              }}
              style={{ borderRadius: "1em" }}
              className="rounded-x mr-2 bg-transparent p-2 text-xs font-bold hover:bg-white/20">
              <TooltipProvider delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger>
                    {pending ? (
                      <Loader2 className="mx-4 my-2 h-4 w-4 animate-spin"></Loader2>
                    ) : (
                      <Lock className="h-4 w-4" />
                    )}
                  </TooltipTrigger>
                  <TooltipContent
                    className="m-0 border-none bg-transparent p-0 pt-1 font-mono text-xs font-extralight outline-none"
                    side="bottom">
                    <p>Make Private</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardItem>
          ) : (
            <CardItem
              translateZ={70}
              onClick={async () => {
                setPending(true);
                await publish(scenario.id);
                router.refresh();
                setPending(false);
              }}
              style={{ borderRadius: "1em" }}
              className="rounded-x mr-2 bg-transparent p-2 text-xs font-bold hover:bg-white/20">
              <TooltipProvider delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger>
                    {pending ? (
                      <Loader2 className="mx-4 my-2 h-4 w-4 animate-spin"></Loader2>
                    ) : (
                      <Globe className="h-4 w-4" />
                    )}
                  </TooltipTrigger>
                  <TooltipContent
                    className="m-0 border-none bg-transparent p-0 pt-1 font-mono text-xs font-extralight outline-none"
                    side="bottom">
                    <p>Publish</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardItem>
          )}
        </div>
      </CardBody>
    </CardContainer>
  );
}
