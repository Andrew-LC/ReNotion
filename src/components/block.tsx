import { rightMenuState } from "../store/atoms";
import { useRecoilState } from "recoil";
import { useState, useEffect } from "react";

enum BlockType {
    HEADING = 'heading',
    PARAGRAPH = 'paragraph',
    IMAGE = 'image',
    BLOCKQUOTE = 'blockquote',
    TODO = 'todo'
}

type Block = {
    id?: string,
    type?: string,
    value: string
}


export default function Block({ id, type, value }: Block) {
    const [menuState, setMenuState] = useRecoilState(rightMenuState)
    const [coords, setCoords] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleWindowMouseMove = event => {
            setCoords({
                x: event.clientX,
                y: event.clientY,
            });
        };
        window.addEventListener('mousemove', handleWindowMouseMove);

        return () => {
            window.removeEventListener(
                'mousemove',
                handleWindowMouseMove,
            );
        };
    }, []);

    const onClick = (e: any) => {
        e.preventDefault();
        setMenuState({ isActive: true, currentBlockId: e.currentTarget.id, x: coords.x, y: coords.y })
    }

    const renderType = () => {
        switch (type) {
            case BlockType.PARAGRAPH:
                return (
                    <p
                        onContextMenu={onClick}
                        id={id} className="outline-none whitespace-pre-wrap break-words text-justify"
                        contentEditable="true"
                        suppressHydrationWarning={true}>
                        {value}
                    </p>
                )
            case BlockType.HEADING:
                return (
                    <h1
                        onContextMenu={onClick}
                        id={id}
                        className="outline-none"
                        contentEditable="true"
                        suppressHydrationWarning={true}>
                        {value}
                    </h1>
                )
            case BlockType.IMAGE:
                return (
                    <img
                        className="w-full"
                        onContextMenu={onClick}
                        id={id}
                        src={value} />
                )
            case BlockType.BLOCKQUOTE:
                return (
                    <blockquote
                        onContextMenu={onClick}
                        id={id} className="focus:outline-none focus-visible:outine-none border-l-[3px] border-slate-300 pl-4"
                        contentEditable="true"
                        suppressHydrationWarning={true}>
                        {value}
                    </blockquote>
                )
            case BlockType.TODO:
                return (
                    <div className="flex gap-2 items-center">
                        <input type="checkbox" id={id} name="check" className="form-checkbox" />
                        <label htmlFor="check"
                            id={id}
                            contentEditable="true"
                            className="outline-none"
                            onContextMenu={onClick}
                        >{value}</label>
                    </div >
                )
            default:
                return <div onContextMenu={onClick} id={id} className="outline-none" contentEditable="true" suppressHydrationWarning={true}></div>;
        }
    }

    return renderType();
}
