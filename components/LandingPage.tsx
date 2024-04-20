"use client"

import { motion } from "framer-motion"

import { HoverEffect } from "./ui/card-hover-effect"
import { HeroHighlight } from "./ui/hero-highlight"
import { AnimatedTooltip } from "./ui/animated-tooltip"
import { ContainerScroll } from "./ui/container-scroll-animation"

import Link from "next/link"
import Image from "next/image"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { useRef } from "react"
import { Card, CardContent } from "./ui/card"

export function LandingPage() {
	const content = [
		{
			title: "Create",
			description:
				"Our intuitive interface makes creating a breeze, letting you focus on your story idea you got in mind. You can start off and continue a journey whenever you want!",
			content: (
				<Image
					src="/create.png"
					width={300}
					height={300}
					className="object-cover w-9/12"
					alt="create page"
				/>
			),
		},
		{
			title: "Dashboard",
			description:
				"Find stories from endless topics, save/remove them to your bookmarks, add a review or remix if you are the author.",
			content: (
				<Image
					src="/dashboard.png"
					width={300}
					height={300}
					className="object-cover w-8/12"
					alt="linear board demo"
				/>
			),
		},
		{
			title: "Story Details",
			description:
				"This page shows off the whole story, its author and the reviews it has. You",
			content: (
				<Image
					src="/story-details.png"
					width={300}
					height={300}
					className="object-cover w-9/12"
					alt="linear board demo"
				/>
			),
		},
		{
			title: "Profile",
			description:
				"Here you see all the data related to your account like username, social links and etc.",
			content: (
				<Image
					src="/profile.png"
					width={300}
					height={300}
					className="object-cover w-9/12"
					alt="linear board demo"
				/>
			),
		},
	];

	const people = [
		{
			id: 1,
			name: "NeoFox",
			designation: "Full Stack Developer",
			image: "https://avatars.githubusercontent.com/u/104744179",
		},
		{
			id: 2,
			name: "xhyabunny",
			designation: "Designer, Frontend, & AI Logic",
			image: "https://avatars.githubusercontent.com/u/106491722",
		},
		{
			id: 3,
			name: "Slaviik",
			designation: "Frontend Developer",
			image: "https://avatars.githubusercontent.com/u/106228555",
		},
		{
			id: 4,
			name: "Nidhish",
			designation: "Database & Frontend Developer",
			image: "https://avatars.githubusercontent.com/u/76598208",
		},
	]

	const projects = [
		{
			title: "SmythOS",
			description:
				"No-code tool for creating APIs that can intergrate with AI and other data sources.",
			link: "https://smythos.com",
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
			title: "React",
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

	const plugin = useRef(
		Autoplay({ delay: 5000, stopOnInteraction: true })
	)

	return (
		<div className="bg-[url('/gif4.gif')]  bg-cover bg-fixed bg-no-repeat bg-center flex flex-col items-center justify-center text-center w-full h-full py-24">
			<HeroHighlight className="pt-36">
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
						<h2 className="pt-0 text-xl">
							Generate interactive stories where{" "}
							<b>your choices shape the narrative</b>.
						</h2>
						<h3 className="pt-2 text-xl">
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
							<div className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-700 to-lime-700" />
							<div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
								Create your own interactive story →
							</div>
						</button>
					</Link>
				</motion.h4>
			</HeroHighlight>
			<h1 className="py-16 pt-40 mb-12 text-6xl font-bold">Features</h1>
			<Carousel
				plugins={[plugin.current]}
				className="max-md:max-w-lg max-sm:max-w-sm"
				onMouseEnter={plugin.current.stop}
				onMouseLeave={plugin.current.reset}
				orientation="vertical"
			>
				<CarouselContent className="h-[560px]">
					{content.map((page, index) => (
						<CarouselItem key={index}>
							<div className="p-1">
								<Card>
									<CardContent className="flex flex-col items-center justify-center py-6">
										<div className="flex flex-col w-full max-w-lg gap-4 mb-4">
											<span className="text-4xl font-semibold">{page.title}</span>
											<p className="pb-5 text-xl font-medium">{page.description}</p>
										</div>
										{page.content}
									</CardContent>
								</Card>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
			<div className="flex flex-col mt-20 overflow-hidden">
				<ContainerScroll
					titleComponent={
						<>
							<h1 className="text-4xl font-semibold text-black dark:text-white">
								Unleash the power of <br />
								<span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
									Stories
								</span>
							</h1>
						</>
					}
				>
					<Image
						src={`/dashboard.png`}
						alt="hero"
						height={700}
						width={1800}
						className="object-fill h-full"
					/>
				</ContainerScroll>
			</div>
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
						<h2 className="pb-6 text-5xl font-bold text-center">Our tools</h2>
						<div className="pb-8">
							<h4 className="pt-2 text-lg text-center">
								Made for the Supabase{" "}
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
					className="mt-[-5rem]"
				>
					{" "}
					<div className="justify-center mt-8">
						<h2 className="pb-2">Meet our team!</h2>
						<div className="ml-[-1rem] flex flex-row">
							<AnimatedTooltip items={people} />
						</div>
					</div>
				</motion.h2>
			</HeroHighlight>
		</div >
	)
}
