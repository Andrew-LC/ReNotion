import { rightMenuState, blockState, isEditable } from "../store/atoms";
import { useRecoilState } from "recoil";
import { useState, useEffect } from "react";
import { CSS } from '@dnd-kit/utilities';


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


export default function Block({ id, type, value, ...props }: Block) {
    const [menuState, setMenuState] = useRecoilState(rightMenuState)
    const [globalState, setGlobalState] = useRecoilState(blockState)
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [blockLocalState, setBlockLocalState] = useState({ id, value })

    useEffect(() => {
        const handleWindowMouseMove = (event: unknown) => {
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
        setMenuState({ isActive: true, currentBlockId: e.currentTarget.id, x: coords.x, y: coords.y })
    }

    const onSelect = (e: any) => {
        console.log('block selected');
        if (blockLocalState.value.length > 0) {
            setBlockLocalState({ id: '', value: '' })
        }
        setBlockLocalState({
            id: e.currentTarget.id,
            value: e.currentTarget.textContent
        });
    }

    const onValueChange = (e: any) => {
        let value = e.currentTarget?.textContent
        setBlockLocalState((prev) => ({
            id: prev.id,
            value: value
        }));
    };


    const onKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            const arr = [...globalState?.content];
            try {
                arr.forEach((block, index) => {
                    if (block.id === blockLocalState.id) {
                        arr[index] = {
                            ...block,
                            value: blockLocalState.value,
                        };
                    }
                });
                console.log(arr)
                setGlobalState((prev) => {
                    return {
                        ...prev,
                        content: [...arr],
                    };
                });
            } catch (err) {
                console.log(err);
            } finally {
                console.log("Final state")
                console.log(globalState)
            }
        }
    }

    const renderType = () => {
        switch (type) {
            case BlockType.PARAGRAPH:
                return (
                    <p
                        onContextMenu={onClick}
                        id={id} className="outline-none whitespace-pre-wrap break-words text-justify"
                        contentEditable="true"
                        suppressHydrationWarning={true}
                        onClick={onSelect}
                        onInput={onValueChange}
                        onKeyDown={onKeyDown}
                    >
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
                        onClick={onSelect}
                        onInput={onValueChange}
                        onKeyDown={onKeyDown}
                        suppressHydrationWarning={true}>
                        {value}
                    </h1>
                )
            case BlockType.IMAGE:
                return (
                    <div className="w-[100%] h-[400px]">
                        <div
                            className="w-full h-full"
                            onContextMenu={onClick}
                            id={id}
                            style={{ "background": `${value}` }} />
                    </div>
                )
            case BlockType.BLOCKQUOTE:
                return (
                    <blockquote
                        onContextMenu={onClick}
                        id={id} className="focus:outline-none focus-visible:outine-none border-l-[3px] border-slate-300 pl-4"
                        contentEditable="true"
                        onClick={onSelect}
                        onInput={onValueChange}
                        onKeyDown={onKeyDown}
                        suppressHydrationWarning={true}>
                        {value}
                    </blockquote>
                )
            case BlockType.TODO:
                return (
                    <div className="flex gap-2 items-center" >
                        <input type="checkbox" id={id} name="check" className="form-checkbox" />
                        <label htmlFor="check"
                            id={id}
                            contentEditable="true"
                            className="outline-none"
                            onClick={onSelect}
                            onInput={onValueChange}
                            onKeyDown={onKeyDown}
                            onContextMenu={onClick}
                        >{value}</label>
                    </div >
                )
            default:
                return (
                    <div
                        onContextMenu={onClick}
                        id={id} className="outline-none"
                        onClick={onSelect}
                        onInput={onValueChange}
                        onKeyDown={onKeyDown}
                        contentEditable="true"
                        suppressHydrationWarning={true}>
                    </div>
                );
        }
    }

    return renderType();
}
