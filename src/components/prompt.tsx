import { useRecoilState } from 'recoil';
import { valueState, blockState } from '../store/atoms';

export default function Prompt() {
    const [value, setValue] = useRecoilState(valueState)
    const [renderState, setRenderState] = useRecoilState(blockState);

    const handleChange = (e: React.ChangeEvent<HTMLDivElement>) => {
        setValue(e.currentTarget.textContent || "");
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            setRenderState((prev) => [
                ...prev,
                { type: 'paragraph', value: value.trim() }
            ]);
            setValue('');
        }
    };

    return (
        <div
            contentEditable="true"
            className="outline-none"
            onInput={handleChange}
            onKeyDown={handleKeyPress}
        />
    );
}
