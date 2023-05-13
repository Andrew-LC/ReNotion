import { ReactNode } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

export default function BlockContainer({ children }: { children: ReactNode }) {
    return (
        <div className="flex justify-center">
            <div className="p-2 opacity-[.7] absolute left-0">
                <div className="p-1 rounded-md">
                    <AiOutlinePlus />
                </div>
            </div>
            {children}
        </div >
    );
}
