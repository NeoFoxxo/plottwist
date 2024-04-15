"use client";
import { Textarea } from "@/components/ui/textarea";
import { submitPrompt } from "@/utils/actions/submitPrompt";
import { Loader2 } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";

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
                className="w-fit gap-4 text-center flex flex-col justify-center"
            >
                <FormField
                    control={form.control}
                    name="prompt"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea
                                    style={{ resize: "none", margin: "0 auto" }}
                                    minLength={15}
                                    maxLength={60}
                                    placeholder="What is your story about?"
                                    {...field}
                                />
                            </FormControl>
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
                        <div className="flex items-center gap-2">
                            <Loader2 className="animate-spin" />
                            Creating your story
                        </div>
                    ) : (
                        "Create your story"
                    )}
                </Button>
            </form>
        </Form>
    );
}
