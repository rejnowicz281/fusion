"use client";

import { FC, useRef, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import css from "./index.module.css";

type ImagePickerProps = {
    name: string;
    id: string;
};

const ImagePicker: FC<ImagePickerProps> = ({ name, id }) => {
    const [imageIsSet, setImageIsSet] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    function handleImageChange() {
        setImageIsSet(true);
    }

    function handleCancelImage() {
        setImageIsSet(false);
        if (inputRef.current) inputRef.current.value = "";
    }

    return (
        <div className={css.container}>
            <input name={name} className={css.input} id={id} type="file" ref={inputRef} onChange={handleImageChange} />
            {imageIsSet && (
                <button className={css.cancel} type="button" onClick={handleCancelImage}>
                    <FaXmark />
                </button>
            )}
        </div>
    );
};

export default ImagePicker;
