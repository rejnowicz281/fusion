"use client";

import useModalContext from "@/providers/ModalContext";
import css from "./index.module.css";

export default function Modal() {
    const { closeModal, modalContent, modalClassName } = useModalContext();

    return (
        <>
            <div className={css.overlay} onClick={closeModal}></div>
            <div className={`${modalClassName ? `${modalClassName} ` : ""}${css.modal}`}>{modalContent}</div>
        </>
    );
}
