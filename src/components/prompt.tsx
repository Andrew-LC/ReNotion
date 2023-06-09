import { useRecoilState } from 'recoil';
import { valueState, blockState, menuState, placeHolder } from '../store/atoms';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import BlockContainer from './blockcontainer';

function generateUUID() {
    return uuidv4();
}

export default function Prompt() {
    const [value, setValue] = useRecoilState(valueState)
    const [renderState, setRenderState] = useRecoilState(blockState);
    const [placeholder, setPlaceHolderState] = useRecoilState(placeHolder);
    const [isActive, setActiveState] = useRecoilState(menuState);
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [temp, setTemp] = useState("");

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.currentTarget.value;
        setPlaceHolderState((prev) => {
            return { ...prev, isActive: true }
        })
        if (target?.length === 1 && target === "/") {
            setActiveState({ isActive: true, x: coords.x, y: coords.y })
            setValue("")
        }
        setValue(e.currentTarget.value || "");
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const newBlock = {
                id: generateUUID(),
                type: "paragraph",
                value: value,
            };
            console.log(newBlock)
            setRenderState((page) => {
                return {
                    ...page,
                    content: [...page.content, newBlock],
                };
            });
            e.currentTarget.value = "";
            setValue("");
        }
    }

    return (
        <>
            <input
                className="outline-none bg-[#191919]"
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                data-placeholder='/ for commands '
                placeholder={placeholder.value}
            />
        </>
    );
}
