import { AiOutlineMenu } from 'react-icons/ai';

export default function Header() {
    return (
        <div className="backdrop-blur-md bg-[#191919]/20 shadow-sm w-full fixed top-0 left-0 right-0 p-3 p-4r-[10px] pl-[10px]">
            <AiOutlineMenu size={"1.3rem"} className="cursor-pointer opacity-[.7]" />
        </div>
    );
}

