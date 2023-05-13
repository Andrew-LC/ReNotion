import { useState, useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { menuState, blockState } from '../store/atoms';

const data = [
    {
        "id": "1",
        "name": "blockquote"
    },
    {
        "id": "2",
        "name": "paragraph",
    },
    {
        "id": "3",
        "name": "image"
    },
    {
        "id": "4",
        "name": "todo"
    }
]

const MenuContext = () => {
    const menustate = useRecoilValue(menuState);
    const [block, setBlocks] = useRecoilState(blockState)
    const [value, setValue] = useState("none")

    useEffect(() => {
        if (menustate.isActive) {
            setValue('flex')
        } else {
            setValue('none')
        }
    }, [menustate.isActive])

    const onClick = (e: any) => {
        const type = e.currentTarget.textContent;
        if (type === 'image') {
            const src = window.prompt("image url !");
            setValue('none')
            setBlocks((prev) => [...prev, { id: "1234-90898", type: type, value: src }])
        }
        setBlocks((prev) => [...prev, { id: "1234-90898", type: type, value: "" }])
    }

    return (
        <div style={{ "display": value, "top": `${menustate.y}px`, "left": `${menustate.x}px` }} className="absolute bottom-0 bg-[#252525] rounded-md w-[210px] flex flex-col gap-2 items-center w-[100px] h-[220px] overflow-hidden" >
            {
                data.map((value) => {
                    return <div onClick={onClick} className="cursor-pointer rounded-md w-full flex-1 p-3 hover:bg-[#313131]" id={value.id}>{value.name}</div>
                })
            }
        </div >
    );
};

export default MenuContext;
