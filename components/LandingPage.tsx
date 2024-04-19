"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { HoverEffect } from "./ui/card-hover-effect";
import { ContainerScroll } from "./ui/container-scroll-animation";
import { HeroHighlight, Highlight } from "./ui/hero-highlight";

export function LandingPage() {
  const projects = [
    {
      title: "Stripe",
      description: "A technology company that builds economic infrastructure for the internet.",
      link: "https://stripe.com",
    },
    {
      title: "Netflix",
      description:
        "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
      link: "https://netflix.com",
    },
    {
      title: "Google",
      description:
        "A multinational technology company that specializes in Internet-related services and products.",
      link: "https://google.com",
    },
    {
      title: "Meta",
      description:
        "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
      link: "https://meta.com",
    },
    {
      title: "Amazon",
      description:
        "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
      link: "https://amazon.com",
    },
    {
      title: "Microsoft",
      description:
        "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
      link: "https://microsoft.com",
    },
  ];

  return (
    <div className="flex h-full w-full flex-col items-center justify-start bg-background bg-[url('/gif4.gif')] bg-cover bg-fixed bg-center bg-no-repeat py-10">
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
          className="mx-auto max-w-6xl px-4 text-center text-4xl font-bold leading-relaxed text-secondary-foreground dark:text-slate-200 md:text-5xl lg:text-7xl lg:leading-snug">
          With plot twist <br /> <span className="font-thin italic"> Nothing&apos;s real.</span>
          <br /> <span className="font-mono font-medium ">Everything is far away.</span> <br />
          <span className="font-light italic ">Everything is</span>
          <br />
          <Highlight className="text-white dark:text-background">imaginary</Highlight>
        </motion.h1>
      </HeroHighlight>
      <div className="flex flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl font-semibold">
                Unleash the power of <br />
                <span className="text-4xl font-bold leading-none md:text-[6rem]">Stories</span>
              </h1>
            </>
          }>
          <Image
            src={`https://www.projectmanager.com/wp-content/uploads/2022/03/Dashboard_Construction_Wide_Zoom-150.jpg`}
            alt="hero"
            height={720}
            width={1400}
            className="mx-auto h-full rounded-2xl object-cover object-left-top"
            draggable={false}
          />
        </ContainerScroll>
      </div>
      <div className="mx-auto max-w-5xl px-8">
        <h2 className="pb-6 text-center text-5xl font-bold">Popular Topics</h2>
        <HoverEffect items={projects} />
      </div>
    </div>
  );
}
