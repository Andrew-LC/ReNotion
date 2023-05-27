"use client"

import Block from '../../components/block';
import BlockContainer from '../../components/blockcontainer';
import Prompt from '../../components/prompt';
import MenuContext from '../../components/MenuContext';
import RightDrawer from '../../components/RightDrawer';
import Header from '../../components/Header';
import RightMenuContext from '../../components/RightMenuContext';
import supabaseClient from "../../lib/supabaseClient"
import { updateHeading } from "../../lib/supabaseAPI";
import { useAuth } from "@clerk/nextjs";
import { blockState, menuState, rightMenuState, pages } from '../../store/atoms';
import { useRecoilState } from 'recoil';
import { useState, useEffect } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

interface RenderBlockState {
    id?: string,
    type?: string;
    value: string;
}

interface Page {
    page_id: string,
    title: string,
    content: RenderBlockState[]
}

export default function Page({ params }: any) {
    const [renderState, setRenderState] = useRecoilState<Page>(blockState);
    const [menu, setMenuState] = useRecoilState(menuState)
    const [rightmenu, setRightMenuState] = useRecoilState(rightMenuState)
    const [tempState, setTempState] = useState("")
    const [pagesDetails, setDetails] = useRecoilState(pages)
    const { getToken, userId } = useAuth();

    useEffect(() => {
        async function getPages() {
            const supabaseAccessToken = await getToken({
                template: "ReNotionJWT",
            });
            const supabase = await supabaseClient(supabaseAccessToken);
            const { data, error } = await supabase
                .from('pages')
                .select("*")
            if (error) console.log(error);
            const newdata = [...data!]
            setDetails((newdata as unknown) as string[])
            console.log(newdata)
        }
        getPages()
    }, [])

    const handleClick = () => {
        setMenuState({ isActive: false })
        setRightMenuState({ isActive: false })
    }

    const handleTitleChange = (e) => {
        setTempState(e.currentTarget.textContent);
    }


    const onKeyPressHeading = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const list: Page[] = [...pagesDetails]
            setDetails([])
            setRenderState((prev) => ({
                ...prev,
                title: tempState
            }));
            const newArr = renderState;
            list.some(async (page, index) => {
                if (page.page_id === renderState.page_id) {
                    console.log(renderState)
                    list.splice(index, 1, newArr);
                    //list.push(renderState)
                    setDetails(list)
                    const supabaseAccessToken = await getToken({
                        template: "ReNotionJWT",
                    });
                    updateHeading(supabaseAccessToken, renderState.page_id, tempState)
                    return true; // Exit the loop
                } else {
                    console.log("This is kinda annoying!");
                    return false; // Continue to the next iteration
                }
            });
        }
    };


    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    return (
        <div onClick={handleClick} className="w-full h-screen flex lg:pr-[80px] lg:pl-[0px]">
            <MenuContext />
            <RightMenuContext />
            <RightDrawer />
            <Header />
            <div onClick={handleClick} className="w-screen h-full flex items-center justify-center gap-2 text-[#ffffffcf]">
                <div className="relative w-[760px] h-full flex flex-col gap-2 overflow-scroll pb-0 pr-[60px] pl-[60px] lg:pr-[90px] lg:pl-[90px] pt-32">
                    <h1
                        onKeyPress={onKeyPressHeading}
                        className="font-extrabold text-4xl outline-none mb-5"
                        contentEditable="true"
                        onInput={handleTitleChange}
                    >
                        {!renderState ? "Untitled" : renderState.title}
                    </h1>
                    <>
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            {
                                !renderState.content ? "" :
                                    <SortableContext
                                        items={renderState.content}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {
                                            renderState.content?.map((block: RenderBlockState, index) => (
                                                <BlockContainer id={block?.id}><Block id={block?.id} key={index} type={block?.type} value={block?.value} /></BlockContainer>
                                            ))
                                        }
                                    </SortableContext>

                            }
                        </DndContext>
                    </>
                    <Prompt />
                </div>
            </div>
        </div>
    );


    function handleDragEnd(event) {
        const { active, over } = event;
        const arr = renderState?.content;

        console.log(active.id);
        console.log(over.id);

        if (active.id !== over.id) {
            let oldPos = 0;
            let newPos = 0;
            arr.forEach((block, index) => {
                if (block.id === active.id) {
                    oldPos = index;
                } else if (block.id === over.id) {
                    newPos = index;
                }
            });

            // Swap the positions of the blocks
            const updatedArr = [...arr];
            [updatedArr[oldPos], updatedArr[newPos]] = [updatedArr[newPos], updatedArr[oldPos]];

            // Update the renderState with the new order of blocks
            setRenderState((prevState) => ({
                ...prevState,
                content: updatedArr,
            }));
        }
    }

}
