import { useState, useEffect } from "react";

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
    }
]

const MenuContext = () => {
    return (
        <div>
            {data.map((value) => {
                <div id={value.id}>{value.name}</div>
            })}
        </div>
    );
};

export default MenuContext;
