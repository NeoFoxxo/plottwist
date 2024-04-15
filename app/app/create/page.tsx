import CreatePrompt from "@/components/CreatePrompt";

export default async function Create() {
    return (
        <main className="flex flex-col flex-1 my-4 md:p-10 justify-start items-center w-full md:w-fit">
            <CreatePrompt />
        </main>
    );
}
