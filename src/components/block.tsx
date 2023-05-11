enum BlockType {
    HEADING = 'heading',
    PARAGRAPH = 'paragraph',
    IMAGE = 'image',
    BLOCKQUOTE = 'blockquote'
}

type Block = {
    type?: string,
    value: string
}

export default function Block({ type, value }: Block) {

    const renderType = () => {
        switch (type) {
            case BlockType.PARAGRAPH:
                return <p className="outline-none" contentEditable="true" suppressHydrationWarning={true}>{value}</p>
            case BlockType.HEADING:
                return <h1 className="outline-none" contentEditable="true" suppressHydrationWarning={true}>{value}</h1>
            case BlockType.IMAGE:
                return <img className="w-1/2" src={value} />
            case BlockType.BLOCKQUOTE:
                return <blockquote className="focus:outline-none focus-visible:outine-none border-l-2 border-slate-300 pl-4" contentEditable="true" suppressHydrationWarning={true}>{value}</blockquote>
            default:
                return <div className="outline-none" contentEditable="true" suppressHydrationWarning={true}></div>;
        }
    }

    return renderType();
}
