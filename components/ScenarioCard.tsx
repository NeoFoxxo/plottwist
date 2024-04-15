"use client";

export function ScenarioCard({ data }) {
    const { title, prompt, story } = data;
    return (
        <div className="flex flex-col items-center justify-start w-56 h-64 bg-gray-700 p-4 m-4">
            Card Placeholder
            {JSON.stringify({ title: title, prompt: prompt, story: story })}
        </div>
    );
}
