import { useEffect, useState } from "react";

export const useTypeWriterEffect = (text: string) => {
    const [index, setIndex] = useState(0);
    const [content, setContent] = useState("");
    useEffect(() => {
        setTimeout(() => {
            if (index < text.length) {
                setContent(content + text.charAt(index));
                setIndex(index + 1);

                console.log(index);
            }
        }, 50);
    }, [index]);
    return content;
};
