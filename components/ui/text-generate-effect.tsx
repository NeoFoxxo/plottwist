"use client";
import { motion, stagger, useAnimate } from "framer-motion";
import { useEffect } from "react";
import { cn } from "../../lib/utils";

export const TextGenerateEffect = ({
    words,
    className,
}: {
    words: string;
    className?: string;
}) => {
    const [scope, animate] = useAnimate();
    let wordsArray = words.split(" ");
    useEffect(() => {
        animate(
            "span",
            {
                opacity: 1,
            },
            {
                duration: 1,
                delay: stagger(0.05),
            }
        );
    }, [scope.current, words]);

    const renderWords = () => {
        return (
            <motion.div ref={scope}>
                {wordsArray.map((word, idx) => {
                    return (
                        <motion.span
                            key={word + idx}
                            className="dark:text-white text-black opacity-0"
                        >
                            {word}{" "}
                        </motion.span>
                    );
                })}
            </motion.div>
        );
    };

    return (
        <div className={cn(className)}>
            <div>
                <div
                    style={{ wordSpacing: "2px", letterSpacing: "0.5px" }}
                    className=" dark:text-white text-black leading-snug tracking-wide"
                >
                    {renderWords()}
                </div>
            </div>
        </div>
    );
};
