import CreatePrompt from "@/components/CreatePrompt";

export default async function Create() {
    return (
        <main className="flex flex-col flex-1 gap-3 p-5 justify-start items-center w-fit">
            <h1 className="mb-1 text-4xl font-bold">
                Create your own interactive story
            </h1>
            <h2 className="mb-5 text-lg">
                Write about a scenario and make different choices to affect the
                stories outcome
            </h2>
            <CreatePrompt />
        </main>
    );
}
