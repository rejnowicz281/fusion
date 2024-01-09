"use client";

import Modal from "@/components/general/Modal";
import { createContext, useContext, useState } from "react";

export const ModalContext = createContext();

export function ModalProvider({ children }) {
    const [modalData, setModalData] = useState({ content: null, className: null });

    function closeModal() {
        setModalData({ content: null, className: null });
    }

    function setModal(content, className) {
        setModalData({ content, className });
    }

    function setModalContent(content) {
        setModalData({ ...modalData, content });
    }

    function setModalClassName(className) {
        setModalData({ ...modalData, className });
    }

    const modalContent = modalData.content;
    const modalClassName = modalData.className;

    return (
        <ModalContext.Provider
            value={{
                setModalContent,
                setModalClassName,
                modalContent,
                modalClassName,
                setModal,
                closeModal,
            }}
        >
            {modalContent && <Modal />}
            {children}
        </ModalContext.Provider>
    );
}

export default function useModalContext() {
    const context = useContext(ModalContext);

    if (!context) throw new Error("useModalContext must be used within a ModalContext Provider");

    return context;
}
