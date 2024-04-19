"use client";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import deleteStory from "@/utils/actions/database/deleteStory";
import { pinStory } from "@/utils/actions/database/pinStory";
import unPublish from "@/utils/actions/database/privateStory";
import publish from "@/utils/actions/database/publishStory";
import { Globe, Loader2, Lock, Pin, PinOff, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

type SCENARIO_TYPES = {
  scenario: {
    created_at: string;
    follow_count: number;
    id: number;
    prompt: string | null;
    story: string | null;
    title: string;
    user_id: string;
    finished: boolean | null;
    published: boolean | null;
    pinned: boolean | null;
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

export function LibraryCard({ scenario }: SCENARIO_TYPES) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const router = useRouter();

  const [pending, setPending] = useState(false);

  const r = Math.floor(Math.random() * shadowcolor.length);

  const { title, prompt, story, finished, published, pinned } = scenario;

  const handleDeleteStory = async () => {
    setIsLoading2(true);
    await deleteStory(scenario.id);
    router.refresh();
  };

  const handlePinStory = async () => {
    setIsLoading(true);
    await pinStory(scenario.id, pinned);
    router.refresh();
  };

  return (
    <CardContainer className="inter-var my-7 h-[10rem] p-0">
      <CardBody
        className={`group/card relative bg-gray-50 shadow-2xl transition-all dark:bg-black/50 ${bordercolor[r]} ${shadowcolor[r]} m-10 my-auto flex h-auto w-auto max-w-[25rem] flex-col rounded-xl border p-7 hover:border-white max-md:h-auto sm:w-[25rem]`}>
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
          <CardItem translateZ={70}>
            <div className="flex justify-start">
              <TooltipProvider delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger>
                    <Button variant={"ghost"} className="mr-2 px-2.5" onClick={handlePinStory}>
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>{pinned ? <PinOff size={18} /> : <Pin size={18} />}</>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent
                    className="m-0 border-none bg-transparent p-0 pt-1 font-mono text-xs font-extralight outline-none"
                    side="bottom">
                    <p>{pinned ? "Unpin" : "Pin"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardItem>
          {finished == false && (
            <CardItem
              as={"a"}
              href={"/app/library/continue/" + scenario.id}
              translateZ={74}
              style={{ borderRadius: "1em" }}
              className="rounded-xl bg-transparent px-4 py-2 text-xs font-normal hover:bg-white/20 dark:text-white ">
              Continue →
            </CardItem>
          )}
          <CardItem translateZ={70}>
            <div className="mt-auto flex justify-end">
              {finished == true && (
                <>
                  {published ? (
                    <CardItem
                      onClick={async () => {
                        setPending(true);
                        await unPublish(scenario.id);
                        router.refresh();
                      }}
                      style={{ borderRadius: "1em" }}
                      className="rounded-x mr-2 bg-transparent p-3 text-xs font-bold hover:bg-white/20">
                      <TooltipProvider delayDuration={300}>
                        <Tooltip>
                          <TooltipTrigger>
                            {pending ? (
                              <Loader2 className="h-4 w-4 animate-spin"></Loader2>
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
                      onClick={async () => {
                        setPending(true);
                        await publish(scenario.id);
                        router.refresh();
                      }}
                      style={{ borderRadius: "1em" }}
                      className="rounded-x mr-2 bg-transparent p-3 text-xs font-bold hover:bg-white/20">
                      <TooltipProvider delayDuration={300}>
                        <Tooltip>
                          <TooltipTrigger>
                            {pending ? (
                              <Loader2 className="h-4 w-4 animate-spin"></Loader2>
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
                </>
              )}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant={"ghost"} className="px-2.5">
                    {isLoading2 ? <Loader2 className="animate-spin" size={18} /> : <Trash size={18} />}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your story.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteStory}>
                      {isLoading ? <Loader2 className="mx-4 my-2 h-4 w-4 animate-spin" /> : "Continue"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
