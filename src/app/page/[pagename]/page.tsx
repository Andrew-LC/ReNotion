import Block from '../../../components/block'
import BlockContainer from '../../../components/blockcontainer'
import Prompt from '../../../components/prompt'

export default function Page({ params }: any) {
    return (
        <div className="w-full h-full flex pt-20 pr-[80px] pl-[80px]">
            <div className="w-full h-full flex flex-col gap-2 text-[#ffffff]">
                <h1 className="font-extrabold text-4xl outline-none mb-6"
                    contentEditable="true">
                    {params.pagename ? params.pagename : 'Untitled'}
                </h1>
            </div>
        </div>
    );
}
