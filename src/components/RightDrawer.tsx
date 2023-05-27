import { useRecoilState } from "recoil"
import { pages, blockState, hamburgerMenuState } from "../store/atoms"
import { BsArrowReturnRight } from "react-icons/bs"
import { generateUUID } from "../store/exampledata"
import { useState, useEffect } from "react"
import { useUser, useAuth, UserButton } from "@clerk/nextjs";
import supabaseClient from "../lib/supabaseClient"


export default function RightDrawer() {
    const [drawerstate, setDrawerState] = useRecoilState(hamburgerMenuState)
    const [drawer, setDrawer] = useState("flex")
    const [renderState, setRenderState] = useRecoilState(blockState)
    const [pagesState, setPagesState] = useRecoilState(pages)
    const { getToken, userId } = useAuth();
    const [isLoading, setLoading] = useState(true);

    const { isLoaded, user } = useUser();

    useEffect(() => {
        if (drawerstate) {
            setDrawer("flex")
        } else {
            setDrawer("none")
        }
        if (!pagesState) {
            setLoading(true)
        } else {
            setLoading(false)
        }
    }, [drawerstate, pagesState])

    const onClick = (e) => {
        const index = e.currentTarget.id;
        setRenderState(pagesState[index])
        setDrawerState((prev: boolean) => !prev)
    }

    const onNewPage = async () => {
        const newPage = {
            id: generateUUID(),
            title: "Untitled",
            content: []
        }
        setRenderState(newPage)
        setPagesState((prev) => {
            return [...prev, newPage]
        })
        const supabaseAccessToken = await getToken({
            template: "ReNotionJWT",
        });
        const supabase = await supabaseClient(supabaseAccessToken);
        console.log({ page_id: newPage.id, owner_id: userId, title: newPage.title })
        const { data, error } = await supabase
            .from("pages")
            .insert({ page_id: newPage.id, owner_id: userId, title: "Untitled" })
            .select()
        if (error) {
            console.log(error)
        }
        console.log(data)
    }

    if (isLoading && isLoaded) {
        return <p>Loading....</p>
    }


    return (
        <div style={{ "display": drawer }} className="z-40 pt-20 p-4 bg-[#202020] text-[#919191] h-full lg:w-[20%] hidden flex flex-col lg:p-2 absolute left-0 right-0 top-0 bottom-0">
            <div className="w-full absolute p-4 pr-10 pl-0 top-4 flex items-center gap-2">
                <UserButton />
                <span className="font-semibold text-gray-400">{user?.firstName + " " + user?.lastName}</span>
            </div>
            <button
                onClick={onNewPage}
                className="bg-[#20262a] rounded-md shadow-md p-2 mt-2 font-bold lg:mt-24">Add Page</button>
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
                                    {page?.title}
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}
