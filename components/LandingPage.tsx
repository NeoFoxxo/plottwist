"use client"

import { motion } from "framer-motion"
import { HoverEffect } from "./ui/card-hover-effect"
import { HeroHighlight } from "./ui/hero-highlight"
import { AnimatedTooltip } from "./ui/animated-tooltip"
import Link from "next/link"

export function LandingPage() {
	const people = [
		{
			id: 1,
			name: "NeoFox",
			designation: "Full Stack Dev",
			image: "https://avatars.githubusercontent.com/u/104744179",
		},
		{
			id: 2,
			name: "xhyabunny",
			designation: "ReactTS & AI Logics",
			image: "https://avatars.githubusercontent.com/u/106491722",
		},
		{
			id: 3,
			name: "Slaviik",
			designation: "Tailwind Expert",
			image: "https://avatars.githubusercontent.com/u/106228555",
		},
		{
			id: 4,
			name: "Nidhish",
			designation: "Database & BugFixer",
			image: "https://avatars.githubusercontent.com/u/76598208",
		},
	]

	const projects = [
		{
			title: "SmythOS",
			description:
				"No-code tool for creating APIs that can intergrate with AI and other data sources.",
			link: "https://smythos.com/?fpr=bonndubz75",
		},
		{
			title: "Supabase",
			description:
				"Open source Firebase alternative. Used for the Postgres database, authentication, and Bucket storage.",
			link: "https://supabase.com",
		},
		{
			title: "Next.js",
			description: "React framework for fullstack functionality",
			link: "https://nextjs.org",
		},
		{
			title: "Vercel",
			description: "Serverless hosting for Plot Twist ",
			link: "https://vercel.com",
		},
		{
			title: "React.ts",
			description:
				"React with TypeScript for scalable and maintainable applications.",
			link: "https://react.dev/",
		},
		{
			title: "Tailwind CSS",
			description:
				"A utility-first CSS framework for fast and responsive web development.",
			link: "https://tailwindcss.com/",
		},
	]

	return (
		<div className="bg-[url('/gif4.gif')] bg-cover bg-fixed bg-no-repeat bg-center flex flex-col items-center justify-center text-center w-full h-full py-20">
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
					className="max-w-4xl px-4 mx-auto text-4xl font-bold leading-relaxed text-center md:text-5xl lg:text-7xl text-secondary-foreground dark:text-slate-200 lg:leading-snug"
				>
					Create Interactive Stories
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
						<h2 className="pt-0 text-lg md:text-xl">
							Generate interactive stories where{" "}
							<b>your choices shape the narrative</b>.
						</h2>
						<h3 className="pt-2 text-lg md:text-xl">
							Start with a prompt, and let our custom AI generate the story and
							choices you can make
						</h3>
					</div>
				</motion.h2>
			</HeroHighlight>
			<HeroHighlight>
				<motion.h4
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
					className="mt-[-5rem]"
				>
					{" "}
					<Link href="/app">
						<button className="p-[3px] relative">
							<div className="absolute inset-0 rounded-lg bg-gray-300" />
							<div className="px-8 py-2  bg-black rounded-[6px] relative group transition duration-200 text-white">
								Create your own interactive story →
							</div>
						</button>
					</Link>
				</motion.h4>
			</HeroHighlight>
			<HeroHighlight className="pt-40">
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
						<div className="justify-center pt-2">
							<h2 className="pb-3 text-xl font-bold">Meet our team!</h2>
							<div className="ml-[-1rem] flex flex-row justify-center">
								<AnimatedTooltip items={people} />
							</div>
						</div>
						<h2 className="pb-6 pt-10 text-5xl font-bold text-center">
							Our tools
						</h2>
						<div className="pb-8">
							<h4 className="pt-2 text-lg text-center">
								App made for the Supabase{" "}
								<a
									className="text-green-300 hover:underline"
									href="https://supabase.com/blog/supabase-oss-hackathon"
								>
									#hackathon
								</a>{" "}
								contest
							</h4>
							<h5>
								Powered by{" "}
								<a
									className="text-green-300 hover:underline"
									href="https://smythos.com"
								>
									SmythOS
								</a>{" "}
								and{" "}
								<a
									className="text-green-300 hover:underline"
									href="https://supabase.com/"
								>
									Supabase
								</a>
							</h5>
						</div>
						<HoverEffect items={projects} />
					</div>
				</motion.footer>
			</HeroHighlight>
		</div>
	)
}
