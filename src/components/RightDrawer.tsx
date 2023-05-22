import { useRecoilState, useRecoilValue } from "recoil"
import { pages, blockState, hamburgerMenuState } from "../store/atoms"
import { BsArrowReturnRight } from "react-icons/bs"
import { blankpage, } from "../store/exampledata"
import { useState, useEffect } from "react"

const styles = {
    closed: {
        "display": "none"
    },
    open: {
        "display": "flex"
    }
}

export default function RightDrawer() {
    const [drawerstate, setDrawerState] = useRecoilState(hamburgerMenuState)
    const [drawer, setDrawer] = useState("flex")
    const [renderState, setRenderState] = useRecoilState(blockState)
    const [pagesState, setPagesState] = useRecoilState(pages)

    useEffect(() => {
        if (drawerstate) {
            setDrawer("flex")
        } else {
            setDrawer("none")
        }
    }, [drawerstate])

    const onClick = (e) => {
        const index = e.currentTarget.id;
        setRenderState(pagesState[index])
        setDrawerState((prev: boolean) => !prev)
    }

    const onNewPage = () => {
        const newPage = blankpage
        setRenderState(blankpage)
        setPagesState((prev) => {
            return [...prev, newPage]
        })
    }


    return (
        <div style={{ "display": drawer }} className="z-40 pt-20 p-4 bg-[#202020] text-[#919191] h-full lg:w-[20%] hidden flex flex-col lg:p-2 absolute left-0 right-0 top-0 bottom-0">
            <button
                onClick={onNewPage}
                className="bg-[#20262a] rounded-md shadow-md p-2 font-bold">Add Page</button>
            <h1 className="text-xl font-bold mb-4 mt-4">Pages</h1>
            <div className="flex flex-col gap-3">
                {
                    pagesState.map((page, index) => {
                        return (
                            <div key={index} className="flex items-center gap-2 font-semibold">
                                <BsArrowReturnRight />
                                <div
                                    id={`${index}`}
                                    onClick={onClick}
                                    className="w-full p-2 rounded-md hover:bg-[#20262a] hover:shadow-md cursor-pointer ">
                                    {page.properties.title}
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}
