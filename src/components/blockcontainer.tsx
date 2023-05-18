import { ReactNode } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from "react";
import { isEditable } from "../store/atoms";
import { useRecoilValue } from "recoil";

export default function BlockContainer({ id, children }: { id: string, children: ReactNode }) {
    const [isActive, setActiveState] = useState(false);
    const iseditable = useRecoilValue(isEditable)

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        setActivatorNodeRef
    } = useSortable({ id: id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: "default"
    };

    const handleMouseEnter = (e) => {
        console.log("WHyyy")
        setActiveState(true)
    }

    const handleMouseLeave = (e) => {
        setTimeout(() => {
            setActiveState(false)
        }, 3000)
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} className="relative w-full" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div ref={setActivatorNodeRef} {...listeners} style={{ "display": (isActive ? "block" : "none") }} className="opacity-[.4] p-2 w-[5px] absolute left-[-2rem] z-20 cursor-pointer">
                <AiOutlineMenu />
            </div>
            {children}
        </div >
    );
}
