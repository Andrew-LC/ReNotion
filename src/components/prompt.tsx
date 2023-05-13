import { useRecoilState } from 'recoil';
import { valueState, blockState, menuState } from '../store/atoms';
import { useState, useEffect } from 'react';

export default function Prompt() {
    const [value, setValue] = useRecoilState(valueState)
    const [renderState, setRenderState] = useRecoilState(blockState);
    const [isActive, setActiveState] = useRecoilState(menuState);
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

    const handleChange = (e: React.ChangeEvent<HTMLDivElement>) => {
        const target = e.currentTarget.textContent;
        if (target?.length === 1 && target === "\\") {
            setActiveState({ isActive: true, x: coords.x, y: coords.y })
            setValue("")
        }
        setValue(e.currentTarget.textContent || "");
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            setRenderState((prev) => [
                ...prev,
                { type: 'paragraph', value: value.trim() }
            ]);
            e.currentTarget.textContent = "";
        }
    };

    return (
        <>
            <div
                contentEditable="true"
                className="outline-none"
                onInput={handleChange}
                onKeyDown={handleKeyPress}
            >
            </div>
        </>
    );
}
