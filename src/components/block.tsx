enum BlockType {
    HEADING = 'heading',
    PARAGRAPH = 'paragraph',
    IMAGE = 'image',
    BLOCKQUOTE = 'blockquote',
    TODO = 'todo'
}

type Block = {
    id?: string,
    type?: string,
    value: string
}


export default function Block({ id, type, value }: Block) {

    const onClick = (e: any) => {
        e.preventDefault();
    }

    const renderType = () => {
        switch (type) {
            case BlockType.PARAGRAPH:
                return (
                    <p
                        onContextMenu={onClick}
                        id={id} className="outline-none"
                        contentEditable="true"
                        suppressHydrationWarning={true}>
                        {value}
                    </p>
                )
            case BlockType.HEADING:
                return (
                    <h1
                        onContextMenu={onClick}
                        id={id}
                        className="outline-none"
                        contentEditable="true"
                        suppressHydrationWarning={true}>
                        {value}
                    </h1>
                )
            case BlockType.IMAGE:
                return (
                    <div
                        className="resize p-2"
                        id={id}>
                        <img
                            className="w-full"
                            src={value} />
                    </div>
                )
            case BlockType.BLOCKQUOTE:
                return (
                    <blockquote
                        onContextMenu={onClick}
                        id={id} className="focus:outline-none focus-visible:outine-none border-l-[3px] border-slate-300 pl-4"
                        contentEditable="true"
                        suppressHydrationWarning={true}>
                        {value}
                    </blockquote>
                )
            case BlockType.TODO:
                return (
                    <div className="flex gap-2 items-center">
                        <input type="checkbox" id={id} name="check" className="form-checkbox" />
                        <label htmlFor="check"
                            id={id}
                            contentEditable="true"
                            className="outline-none"
                            onContextMenu={onClick}
                        >{value}</label>
                    </div >
                )
            default:
                return <div onContextMenu={onClick} id={id} className="outline-none" contentEditable="true" suppressHydrationWarning={true}></div>;
        }
    }

    return renderType();
}
