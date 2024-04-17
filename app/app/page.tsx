import { createClient } from "@/utils/supabase/server"
import { ScenarioCard } from "@/components/ScenarioCard"
import { getScenarios } from "@/utils/actions/database/getScenarios"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import getUserInfo from "@/utils/actions/getUserinfo"

export default async function Dashboard() {

    const supabase = createClient()

    const { data, error: authError } = await supabase.auth.getUser();

    const { mostPopular, recentStories } = await getScenarios()

    return (
        <div className="container p-4 flex flex-row max-lg:flex-col mx-auto text-2xl">
            <div className="flex flex-col w-full mx-auto">
                <p
                    style={{
                        fontFamily: '"Poppins", sans-serif',
                        textShadow: "0em 0em 0.3em rgba(100,240,230,1)",
                    }}
                    className="text-4xl font-bold text-center"
                >
                    Most popular
                </p>
                <Carousel
                    opts={{ align: "start" }}
                    orientation={"vertical"}
                    className="w-full mt-10"
                >
                    <CarouselContent className="top-0">
                        {mostPopular?.map(async (scenario, index) => (
                            <CarouselItem
                                key={index}
                                className="pt-0 md:basis-1/3"
                            >
                                <ScenarioCard key={scenario.id} currentUser={data} data={await getUserInfo(scenario.user_id)} scenario={scenario} />
                            </CarouselItem>
                        ))}
                        <div className="pb-20"></div>
                    </CarouselContent>
                </Carousel>
            </div>
            <div className="flex flex-col w-full mx-auto">
                <p
                    style={{
                        fontFamily: '"Poppins", sans-serif',
                        textShadow: "0em 0em 0.3em rgba(100,240,230,1)",
                    }}
                    className="text-4xl font-bold text-center max-md:mt-10"
                >
                    New stories
                </p>
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    orientation="vertical"
                    className="w-full mt-10"
                >
                    <CarouselContent className="top-0">
                        {recentStories?.map(async (scenario, index) => (
                            <CarouselItem
                                key={index}
                                className="p-0 md:basis-1/3"
                            >
                                <ScenarioCard currentUser={data} data={await getUserInfo(scenario.user_id)} key={scenario.id} scenario={scenario} />
                            </CarouselItem>
                        ))}
                        <div className="pb-20"></div>
                    </CarouselContent>
                </Carousel>
            </div>
        </div>
    );
}
