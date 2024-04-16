import { ScenarioCard } from "@/components/ScenarioCard";
import {
    Carousel,
    CarouselContent,
    CarouselItem
} from "@/components/ui/carousel";
import { getScenarios } from "@/utils/actions/getScenarios";

export default async function Dashboard() {
    const scenarios = await getScenarios();

    return (
        <div className="container p-4 flex flex-row max-md:flex-col mx-auto text-2xl w-[100vw] max-h-[80vh] overflow-hidden max-md:overflow-y-scroll">
            <div className="flex flex-col w-full mx-auto">
                <p style={{ fontFamily: '"Poppins", sans-serif', textShadow: '0em 0em 0.3em rgba(100,240,230,1)' }} className="text-4xl font-bold text-center">Most popular</p>
                <Carousel
                    opts={{ align: "start" }}
                    orientation={"vertical"}
                    className="w-full mt-10"
                >
                    <CarouselContent className="top-0 max-h-[80vh]">
                        {scenarios?.map((scenario, index) => (
                            <CarouselItem key={index} className="pt-0 md:basis-1/3">
                                <ScenarioCard key={scenario.id} scenario={scenario} />
                            </CarouselItem>
                        ))}
                        <div className="pb-20"></div>
                    </CarouselContent>
                </Carousel>
            </div>
            <div className="flex flex-col w-full mx-auto">
                <p style={{ fontFamily: '"Poppins", sans-serif', textShadow: '0em 0em 0.3em rgba(100,240,230,1)' }} className="text-4xl font-bold text-center max-md:mt-10">New stories</p>
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    orientation="vertical"
                    className="w-full mt-10"
                >
                    <CarouselContent className="top-0 max-h-[80vh] ">
                        {scenarios?.map((scenario, index) => (
                            <CarouselItem key={index} className="p-0 md:basis-1/3">
                                <ScenarioCard key={scenario.id} scenario={scenario} />
                            </CarouselItem>
                        ))}
                        <div className="pb-20"></div>
                    </CarouselContent>
                </Carousel>
            </div>
        </div>
    );
}
