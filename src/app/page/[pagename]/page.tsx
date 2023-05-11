"use client"

import { useState } from "react";
import Block from '../../../components/block';
import BlockContainer from '../../../components/blockcontainer';
import Prompt from '../../../components/prompt';

interface RenderBlockState {
    type?: string;
    value: string;
}

const exampleData = [
    { type: 'blockquote', value: 'Client Components enable you to add client-side interactivity to your application. In Next.js, they are pre-rendered on the server and hydrated on the client. You can think of Client Components as how components in the Pages Router have always worked.' },
    { type: 'paragraph', value: 'Since Server Components are the default, all components are part of the Server Component module graph unless defined or imported in a module that starts with the "use client" directive.' }
];

export default function Page({ params }: any) {
    const [renderState, setRenderState] = useState<RenderBlockState[]>(exampleData);
    const [value, setValue] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLDivElement>) => {
        setValue(e.currentTarget.textContent || "");
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            setRenderState((prev) => [
                ...prev,
                { type: 'paragraph', value: value.trim() }
            ]);
            setValue('');
        }
    };

    return (
        <div className="w-full h-full flex pt-20 pr-[80px] pl-[80px]">
            <div className="w-full h-full flex flex-col gap-2 text-[#ffffff]">
                <h1
                    className="font-extrabold text-4xl outline-none mb-6"
                    contentEditable="true"
                >
                    {params.pagename ? params.pagename : 'Untitled'}
                </h1>
                <>
                    {renderState.length > 0 &&
                        renderState.map((block, index) => (
                            <Block key={index} type={block?.type} value={block?.value} />
                        ))}
                </>
                <div
                    className="outline-none"
                    contentEditable="true"
                    onInput={handleChange}
                    onKeyDown={handleKeyPress}
                ></div>
            </div>
        </div>
    );
}
