import { useState, useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { rightMenuState, blockState, placeHolder } from '../store/atoms';

const data = [
    {
        "id": "1",
        "name": "Turn into"
    },
    {
        "id": "2",
        "name": "Delete"
    },
]

const RightMenuContext = () => {
    const menustate = useRecoilValue(rightMenuState);
    const [blocks, setBlockState] = useRecoilState(blockState);
    const [placeholder, setPlaceHolderState] = useRecoilState(placeHolder);
    const [value, setValue] = useState("none");


    useEffect(() => {
        if (menustate.isActive) {
            setValue('flex')
        } else {
            setValue('none')
        }
    }, [menustate.isActive])

    const removeObjectWithId = (arr: any, id: any) => {
        const objWithIdIndex = arr.findIndex((obj) => obj.id === id);

        if (objWithIdIndex > -1) {
            arr.splice(objWithIdIndex, 1);
        }

        return arr;
    }


    const onClick = (e: any) => {
        e.preventDefault();
        const arr = [...blocks.content];
        removeObjectWithId(arr, menustate.currentBlockId)
        setBlockState((prev) => {
            return {
                ...prev,
                content: [...arr]
            }
        })
        setPlaceHolderState((prev) => {
            return { ...prev, isActive: false }
        })
    }

    return (
        <div style={{ "display": value, "top": `${menustate.y}px`, "left": `${menustate.x}px` }} className="absolute bottom-0 bg-[#252525] rounded-md w-[210px] flex flex-col gap-2 items-center w-[100px] h-[220px] overflow-hidden z-20" >
            {
                data.map((value) => {
                    return <div onClick={onClick} className="cursor-pointer rounded-md w-full flex-1 p-3 hover:bg-[#313131]" id={value.id}>{value.name}</div>
                })
            }
        </div >
    );
};

export default RightMenuContext;
