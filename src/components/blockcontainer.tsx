import { ReactNode } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from "react";

export default function BlockContainer({ id, children }: { id: string, children: ReactNode }) {
    const [isActive, setActiveState] = useState(false);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        setActivatorNodeRef
    } = useSortable({ id: id });

    const style = {
        transform: CSS.Translate.toString(transform),
        transition: "all 150ms ease-in-out",
        cursor: "default",
    };

    const handleMouseEnter = () => {
        setActiveState(true)
    }

    const handleMouseLeave = () => {
        setTimeout(() => {
            setActiveState(false)
        }, 3000)
    }

    return (
        <div
            onContextMenu={(e) => e.preventDefault()}
            ref={setNodeRef}
            style={style} {...attributes}
            className="relative w-full"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <div ref={setActivatorNodeRef} {...listeners} style={{ "display": (isActive ? "block" : "none") }} className="opacity-[.4] p-2 w-[5px] absolute left-[-2rem] z-20 cursor-grab">
                <AiOutlineMenu />
            </div>
            {children}
        </div >
    );
}
