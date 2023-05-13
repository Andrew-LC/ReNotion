"use client"

import { useState } from "react";
import Block from '../../../components/block';
import BlockContainer from '../../../components/blockcontainer';
import Prompt from '../../../components/prompt';
import MenuContext from '../../../components/MenuContext';
import { blockState, menuState } from '../../../store/atoms';
import { useRecoilState } from 'recoil';

interface RenderBlockState {
    id?: string,
    type?: string;
    value: string;
}

export default function Page({ params }: any) {
    const [renderState, setRenderState] = useRecoilState<RenderBlockState[]>(blockState);
    const [menu, setMenuState] = useRecoilState(menuState)

    const handleClick = () => {
        setMenuState(false)
    }

    return (
        <div onClick={handleClick} className="w-full h-full flex pt-20 pr-[80px] pl-[80px]">
            <MenuContext />
            <div onClick={handleClick} className="w-full h-full flex flex-col gap-2 text-[#ffffff] lg:pr-[350px] lg:pl-[350px]">
                <h1
                    className="font-extrabold text-4xl outline-none mb-6"
                    contentEditable="true"
                >
                    {params.pagename === "Notion" ? 'Untitled' : params.pagename}
                </h1>
                <>
                    {renderState.length > 0 &&
                        renderState.map((block, index) => (
                            <Block id={block?.id} key={index} type={block?.type} value={block?.value} />
                        ))}
                </>
                <Prompt />
            </div>
        </div>
    );
}
