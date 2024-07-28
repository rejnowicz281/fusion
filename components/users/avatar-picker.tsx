"use client";

import { MdClose } from "@react-icons/all-files/md/MdClose";
import Image from "next/image";
import { FC, useRef, useState } from "react";

const AvatarPicker: FC<{ defaultUrl: string }> = ({ defaultUrl }) => {
    const [selectedImage, setSelectedImage] = useState<string>(defaultUrl);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();

            reader.onload = function (event) {
                setSelectedImage(event.target?.result as string);
            };

            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleRemoveImage = () => {
        setSelectedImage(defaultUrl);
        if (inputRef.current) inputRef.current.value = "";
    };

    const handleImageClick = () => {
        if (selectedImage !== defaultUrl) handleRemoveImage();
        else inputRef.current?.click();
    };

    return (
        <>
            <input
                className="hidden"
                ref={inputRef}
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleImageChange}
            />
            <button
                type="button"
                onClick={handleImageClick}
                className="rounded-[50%] w-[100px] h-[100px] relative group"
            >
                <Image
                    src={selectedImage}
                    fill
                    unoptimized
                    sizes="150px"
                    alt="Your avatar"
                    className="rounded-[50%] cursor-pointer group-hover:opacity-30 transition-opacity"
                />
                {selectedImage !== defaultUrl && (
                    <MdClose className="text-2xl absolute pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                )}
            </button>
        </>
    );
};

export default AvatarPicker;
