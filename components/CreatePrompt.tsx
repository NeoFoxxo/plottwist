"use client";
import { Textarea } from "@/components/ui/textarea";
import { submitPrompt } from "@/utils/actions/submitPrompt";
import { Loader2 } from "lucide-react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { useState } from "react";

const createSchema = z.object({
	prompt: z.string()
		.min(15, "Minimum characters should be 15!")
		.max(60, "Maximum characters should be 60!")
});

export default function CreatePrompt() {
	const [pending, setPending] = useState(false);

	const form = useForm<z.infer<typeof createSchema>>({
		resolver: zodResolver(createSchema),
		defaultValues: {
			prompt: ""
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
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 text-left">
				<FormField
					control={form.control}
					name="prompt"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Enter your prompt</FormLabel>
							<FormControl>
								<Textarea placeholder="What is your story about?" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				>
				</FormField>
				<Button type="submit" disabled={pending}>
					{pending ?
						<div className="flex items-center gap-2">
							<Loader2 className="animate-spin" />
							Creating your story
						</div>
						: "Create your story"
					}
				</Button>
			</form>
		</Form>
	)
}
