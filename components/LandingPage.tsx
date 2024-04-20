"use client";

import { motion } from "framer-motion";
import { HoverEffect } from "./ui/card-hover-effect";
import { HeroHighlight } from "./ui/hero-highlight";
import { AnimatedTooltip } from "./ui/animated-tooltip";
import { Button } from "./ui/button";

export function LandingPage() {

	const people = [
		{
			id: 1,
			name: "NeoFox",
			designation: "TypeScript Techie",
			image:
				"https://avatars.githubusercontent.com/u/104744179",
		},
		{
			id: 2,
			name: "xhyabunny",
			designation: "React & AI Logics",
			image:
				"https://avatars.githubusercontent.com/u/106491722",
		},
		{
			id: 3,
			name: "Slaviik",
			designation: "Tailwind Expert",
			image:
				"https://avatars.githubusercontent.com/u/106228555",
		},
		{
			id: 4,
			name: "Nidhish",
			designation: "Database & BugFixer",
			image:
				"https://avatars.githubusercontent.com/u/76598208",
		}
	];

	const projects = [
		{
			title: "SmythOS",
			description: "Empower your development with SmythOS. Integrate AI, APIs, and data sources easily. Simplify complexity, enhance control, and accelerate innovation.",
			link: "https://smythos.com",
		},
		{
			title: "Supabase",
			description: "Open source Firebase alternative. Start with Postgres, Authentication, instant APIs, Edge Functions, Realtime subscriptions, Storage, and Vector embeddings.",
			link: "https://supabase.com",
		},
		{
			title: "Next.js",
			description: "The React framework for most server-rendered websites.",
			link: "https://nextjs.org",
		},
		{
			title: "Vercel",
			description: "Website host for Plot Twist",
			link: "https://vercel.com",
		},
		{
			title: "React.ts",
			description: "React with TypeScript for scalable and maintainable applications.",
			link: "https://www.typescriptlang.org/docs/handbook/react.html",
		},
		{
			title: "Tailwind",
			description: "A utility-first CSS framework for fast and responsive web development.",
			link: "https://tailwindcss.com/",
		},
	];

	return (
		<div className="bg-[url('/gif4.gif')] bg-background bg-cover bg-fixed bg-no-repeat bg-center flex flex-col items-center justify-center text-center w-full h-full py-10">
			<HeroHighlight>
				<motion.h1
					initial={{
						opacity: 0,
						y: 20,
					}}
					animate={{
						opacity: 1,
						y: [20, -5, 0],
					}}
					transition={{
						duration: 0.5,
						ease: [0.4, 0.0, 0.2, 1],
					}}
					className="max-w-6xl px-4 mx-auto text-4xl font-bold leading-relaxed text-center md:text-5xl lg:text-7xl text-secondary-foreground dark:text-slate-200 lg:leading-snug"
				>
					Plot Twist
				</motion.h1>
			</HeroHighlight>
			<HeroHighlight>
				<motion.h2
					initial={{
						opacity: 0,
						y: 0,
					}}
					animate={{
						opacity: 1,
						y: [40, 0, 0],
					}}
					transition={{
						duration: 0.5,
						ease: [0.4, 0.0, 0.2, 1],
					}}
					className="mt-[-4rem]"
				>
					<div className="flex flex-col overflow-hidden pb-7">
						<p className="text-lg pt-4">Create stories and choose your own adventure powered by <a className="text-green-300 hover:underline" href="https://smythos.com">SmythOS</a> and <a className="text-green-300 hover:underline" href="https://supabase.com/">Supabase</a></p>
						<p className="text-lg text-center pt-2">Made for the <a className="text-green-300 hover:underline" href="https://supabase.com/blog/supabase-oss-hackathon">#hackathon</a> contest</p>
					</div>
				</motion.h2>
			</HeroHighlight>
			<HeroHighlight>
				<motion.h2
					initial={{
						opacity: 0,
						y: 0,
					}}
					animate={{
						opacity: 1,
						y: [40, 0, 0],
					}}
					transition={{
						duration: 0.5,
						ease: [0.4, 0.0, 0.2, 1],
					}}
					className="mt-[-7rem]"
				>
					<div className="justify-center pb-20">
						<h2 className="pb-2">Meet our team!</h2>
						<div className="ml-[-1rem] flex flex-row">
							<AnimatedTooltip items={people} />
						</div>
					</div>
				</motion.h2>
			</HeroHighlight>
			<HeroHighlight>
				<motion.h2
					initial={{
						opacity: 0,
						y: 0,
					}}
					animate={{
						opacity: 1,
						y: [40, 0, 0],
					}}
					transition={{
						duration: 0.5,
						ease: [0.4, 0.0, 0.2, 1],
					}}
					className="mt-[-7rem]"
				>
					<Button onClick={() => { window.location.assign('./login') }} className="w-40 h-10 text-xl" variant='default'>Try it out →</Button>
				</motion.h2>
			</HeroHighlight>
			<HeroHighlight>
				<motion.footer
					initial={{
						opacity: 0,
						y: 20,
					}}
					animate={{
						opacity: 1,
						y: [20, -5, 0],
					}}
					transition={{
						duration: 0.8,
						ease: [0.5, 0.0, 0.4, 1],
					}}
				>
					<div className="max-w-5xl px-8 mx-auto">
						<h2 className="pb-6 text-5xl font-bold text-center">
							Our tools
						</h2>
						<HoverEffect items={projects} />
					</div>
				</motion.footer>
			</HeroHighlight>
		</div>
	);
}