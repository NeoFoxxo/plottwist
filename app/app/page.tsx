import { ScenarioCard } from "@/components/ScenarioCard";
import { getScenarios } from "@/utils/actions/getScenarios";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card";

export default async function Dashboard() {
    const scenarios = await getScenarios();

    return (
        <div className="container flex flex-row m-4 text-2xl w-full max-h-[80vh] overflow-hidden ">
            <div className="flex w-full flex-col">
                <p style={{ textShadow: '0em 0em 0.5em rgba(100,240,230,1)' }} className="text-lg text-center">Most popular</p>
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    orientation="vertical"
                    className="w-full"
                >
                    <CarouselContent className="top-0 max-h-[80vh]">
                        {scenarios?.map((scenario, index) => (
                            <CarouselItem key={index} className="pt-0 md:basis-1/2">
                                <ScenarioCard key={scenario.id} scenario={scenario} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
            <div className="flex w-full flex-col">
                <p style={{ textShadow: '0em 0em 0.5em rgba(100,240,230,1)' }} className="text-lg text-center">My stories</p>
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    orientation="vertical"
                    className="w-full"
                >
                    <CarouselContent className="top-0 max-h-[80vh]">
                        {scenarios?.map((scenario, index) => (
                            <CarouselItem key={index} className="pt-0 md:basis-1/2">
                                <ScenarioCard key={scenario.id} scenario={scenario} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </div>
    );
}
