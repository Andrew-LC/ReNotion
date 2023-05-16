"use client"

import Block from '../../../components/block';
//import BlockContainer from '../../../components/blockcontainer';
import Prompt from '../../../components/prompt';
import MenuContext from '../../../components/MenuContext';
import Header from '../../../components/Header';
import RightMenuContext from '../../../components/RightMenuContext';
import { blockState, menuState, rightMenuState } from '../../../store/atoms';
import { useRecoilState } from 'recoil';

interface RenderBlockState {
    id?: string,
    type?: string;
    value: string;
}

interface Page {
    id: string,
    type: string,
    properties: {
        title: string,
    },
    content: RenderBlockState[]
}

export default function Page({ params }: any) {
    const [renderState, setRenderState] = useRecoilState<Page>(blockState);
    const [menu, setMenuState] = useRecoilState(menuState)
    const [rightmenu, setRightMenuState] = useRecoilState(rightMenuState)

    const handleClick = () => {
        setMenuState({ isActive: false })
        setRightMenuState({ isActive: false })
    }

    return (
        <div onClick={handleClick} className="w-full h-screen flex pt-32 pr-[80px] pl-[80px]">
            <MenuContext />
            <RightMenuContext />
            <Header />

            <div onClick={handleClick} className="w-full h-full flex flex-col gap-2 text-[#ffffff] overflow-scroll lg:pr-[350px] lg:pl-[350px]">
                <h1
                    className="font-extrabold text-4xl outline-none mb-6"
                    contentEditable="true"
                >
                    {params.pagename === "Notion" ? 'Untitled' : params.pagename}
                </h1>
                <>
                    {renderState.content?.length > 0 &&
                        renderState.content?.map((block: RenderBlockState, index) => (
                            <Block id={block?.id} key={index} type={block?.type} value={block?.value} />
                        ))}
                </>
                <Prompt />
            </div>
        </div>
    );
}
