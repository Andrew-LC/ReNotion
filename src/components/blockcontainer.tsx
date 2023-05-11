import { ReactNode } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

export default function BlockContainer({ children }: { children: ReactNode }) {
    return (
        <div className="flex justify-center">
            <div className="p-2">
                <AiOutlinePlus />
            </div>
            {children}
        </div >
    );
}
