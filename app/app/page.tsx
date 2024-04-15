import { ScenarioCard } from "@/components/ScenarioCard";
import { getScenarios } from "@/utils/actions/getScenarios";

export default async function Dashboard() {
    const scenarios = await getScenarios();

    return (
        <div className="m-4 text-2xl w-full">
            <div className="flex gap-4">
                {scenarios?.map((scenario) => (
                    <ScenarioCard key={scenario.id} scenario={scenario} />
                ))}
            </div>
        </div>
    );
}
