"use client";
import { Textarea } from "@/components/ui/textarea";
import { submitPrompt } from "@/utils/actions/submitPrompt";
import { Bot, Loader2 } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";

const createSchema = z.object({
    prompt: z
        .string()
        .min(15, "Minimum characters should be 15!")
        .max(60, "Maximum characters should be 60!"),
});

export default function CreatePrompt() {
    const [pending, setPending] = useState(false);

    const form = useForm<z.infer<typeof createSchema>>({
        resolver: zodResolver(createSchema),
        defaultValues: {
            prompt: "",
        },
    });

    async function onSubmit(values: z.infer<typeof createSchema>) {
        setPending(true);
        try {
            const result = await submitPrompt(values);
            console.log(result);
        } catch (err) {
            setPending(false);
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full p-4 sm:px-0 sm:py-4 sm:w-2/3 md:p-0 space-y-6"
            >
                <h1 className="text-4xl font-bold">
                    Create your own interactive story
                </h1>
                <FormField
                    control={form.control}
                    name="prompt"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg font-normal">
                                Write about a scenario and make different
                                choices to affect the stories outcome.
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    className="text-start"
                                    minLength={15}
                                    maxLength={60}
                                    placeholder="What is your story about?"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Please enter a prompt regarding the story you
                                want to generate.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                ></FormField>
                <Button
                    className="w-fit mx-auto"
                    type="submit"
                    disabled={pending}
                >
                    {pending ? (
                        <div className="flex items-center justify-center gap-2">
                            <Loader2 className="animate-spin" />
                            Creating your story
                        </div>
                    ) : (
                        <div className="flex items-center justify-center gap-2">
                            <Bot />
                            Create your story
                        </div>
                    )}
                </Button>
            </form>
        </Form>
    );
}
