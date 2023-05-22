import { AiOutlineMenu } from 'react-icons/ai';
import { hamburgerMenuState } from '../store/atoms'
import { useRecoilState } from 'recoil'

export default function Header() {
    const [hamburgerState, setHamburgerState] = useRecoilState(hamburgerMenuState)

    const onClick = () => {
        setHamburgerState((prev: boolean) => !prev)
    }

    return (
        <div className="z-20 backdrop-blur-md lg:w-[80%] bg-[#191919]/20 shadow-sm w-full fixed top-0 right-0 p-3 p-4r-[10px] pl-[10px]">
            <AiOutlineMenu onClick={onClick} size={"1.3rem"} className="cursor-pointer opacity-[.7]" />
        </div>
    );
}

