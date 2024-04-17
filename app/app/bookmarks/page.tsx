import { ScenarioCard } from "@/components/ScenarioCard";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { getBookmarks } from "@/utils/actions/database/getBookmarks";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Bookmarks() {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const user_id = user?.id;
    if (!user_id) redirect("/login");

    const scenarios = await getBookmarks(user_id);

    return (
        <div className="pt-5 w-full flex flex-col gap-10 justify-center items-center">
            <h2 className="text-2xl font-bold">Bookmarks</h2>
            <section className="w-full flex flex-wrap gap-10 justify-start">
                <Carousel>
                    <CarouselContent>
                        {scenarios.map((scenario, index) => (
                            <CarouselItem key={index}>
                                <ScenarioCard
                                    key={scenario.id}
                                    scenario={scenario}
                                    bookmark={true}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </section>
        </div>
    );
}
