import { ScenarioCard } from "@/components/ScenarioCard";
import { getScenarios } from "@/utils/actions/getScenarios";

export default async function Dashboard() {
    const scenarios = await getScenarios();

    return (
        <div className="m-4 text-2xl flex-1 w-full flex flex-col items-center">
            <h2>DASHBOARD PLACEHOLDER</h2>
            {scenarios?.map((scenario) => (
                <ScenarioCard data={scenario} />
            ))}
        </div>
    );
}
