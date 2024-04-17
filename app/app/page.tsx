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
        <div className="container h-[90vh] overflow-hidden p-4 flex flex-row max-lg:flex-col mx-auto text-2xl">
            <div className="flex flex-col w-full mx-auto">
                <h2 style={{ textShadow: '0em 0em 0.6em white' }} className="text-2xl font-bold text-center">Most popular</h2>
                <Carousel
                    opts={{ align: "start" }}
                    orientation={"vertical"}
                    className="w-full mt-2"
                >
                    <CarouselContent className="py-5 top-0 h-[80vh]">
                        {mostPopular?.map(async (scenario, index) => (
                            <CarouselItem
                                key={index}
                                className="py-5 md:basis-1/3"
                            >
                                <ScenarioCard key={scenario.id} currentUser={data} data={await getUserInfo(scenario.user_id)} scenario={scenario} />
                            </CarouselItem>
                        ))}
                        <div className="pb-20"></div>
                    </CarouselContent>
                </Carousel>
            </div>
            <div className="flex flex-col w-full mx-auto">
                <h2 style={{ textShadow: '0em 0em 0.6em white' }} className="text-2xl font-bold text-center">New stories</h2>
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    orientation="vertical"
                    className="w-full mt-2"
                >
                    <CarouselContent className=" py-5 top-0 h-[80vh]">
                        {recentStories?.map(async (scenario, index) => (
                            <CarouselItem
                                key={index}
                                className="py-5 md:basis-1/3"
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
