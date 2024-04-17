"use client"
import { Textarea } from "@/components/ui/textarea"
import { continueStory } from "@/utils/actions/api/continueStory"
import { StoryReturnTypes } from "@/utils/actions/database/insertStory"
import { regenerateStory } from "@/utils/actions/api/regenerateStory"
import { submitPrompt } from "@/utils/actions/api/submitPrompt"
import { zodResolver } from "@hookform/resolvers/zod"
import { Bot, Loader2 } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "./ui/button"
import { TextGenerateEffect } from "./ui/text-generate-effect"
import { finishStory } from "@/utils/actions/api/finishStory"
import Link from "next/link"
import { ChildProcess } from "child_process"

export default function ContinueStory({ story }: {
    story: {
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
    } | null
}
) {
    const [pending, setPending] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [scenario, setScenario] = useState(story)
    const [storyPartCount, setStoryPartCount] = useState(0)

    async function generateFromChoice(choice: string) {
        console.log(choice)
        setPending(true)
        setStoryPartCount((storyPartCount) => storyPartCount + 1)

        let scenarioData: StoryReturnTypes

        if (storyPartCount >= 8) {
            scenarioData = await finishStory({
                title: scenario?.title!,
                prompt: `${scenario?.story!!} ${choice}`,
                previousStoryId: scenario?.id!!,
                currentStory: scenario?.story!!,
            })
        } else {
            scenarioData = await continueStory({
                title: scenario?.title!,
                prompt: `${scenario?.story!!} ${choice}`,
                previousStoryId: scenario?.id!!,
                currentStory: scenario?.story!!,
            })
        }

        setPending(false)
        setScenario(story)
    }

    return (
        <>
            {scenario && (
                <section className="p-4 flex flex-col flex-wrap justify-center items-start gap-4 max-w-[800px]">
                    <h1 className="text-4xl font-bold pb-10">{scenario.title}</h1>
                    <h4 className="text-[1.15rem]">
                        <b>Prompt:</b> {scenario.prompt}
                    </h4>
                    <article className="flex flex-col gap-2">
                        <h4 className="font-semibold text-[1.05rem]">Your story:</h4>
                        <TextGenerateEffect
                            className="font-normal text-[1.05rem]"
                            words={scenario.story ? scenario.story : "Loading..."}
                        />
                    </article>
                    {
                        pending && (
                            <h5 className="font-semibold flex justify-center items-center gap-2">
                                Selecting Choice <Loader2 className="animate-spin" />
                            </h5>
                        )
                    }
                    <div className="flex flex-col flex-wrap gap-2">
                        {storyPartCount >= 9 ? (
                            <>
                                {!pending && (
                                    <>
                                        <h4 className="text-lg font-bold">
                                            Your story is finished!
                                        </h4>
                                        <Link href={"/app/library"}>
                                            <Button className="font-semibold flex justify-center items-center gap-2">
                                                Go to Library
                                            </Button>
                                        </Link>
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                <h4 className="font-semibold">Make your choice:</h4>
                                {scenario!!.choices!!.map((choice, index) => {
                                    return (
                                        <div
                                            key={index}
                                            onClick={async () => await generateFromChoice(choice)}
                                            className="py-2 px-4 cursor-pointer bg-neutral-800 hover:bg-neutral-900 w-fit rounded-md"
                                        >
                                            {choice}
                                        </div>
                                    )
                                })}
                            </>
                        )}
                        {errorMessage && (
                            <p style={{ color: "rgba(255,50,105,0.600)" }}>{errorMessage}</p>
                        )}
                    </div>
                </section>
            )}
        </>
    )
}
