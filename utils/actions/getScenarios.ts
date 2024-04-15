import { createClient } from "@/utils/supabase/server";

export async function getScenarios() {
    const supabase = createClient();

    let { data: scenarios, error } = await supabase
        .from("scenarios")
        .select("*");

    if (error) throw new Error("Get scenarios failed!");
    return scenarios;
}
