"use client";

import useAuthContext from "@/providers/AuthProvider";
import useModalContext from "@/providers/ModalContext";
import DeleteUser from "./DeleteUser";
import css from "./index.module.css";

export default function DeleteUserButton(id) {
    const { user } = useAuthContext();
    const { setModalContent } = useModalContext();

    if (user.id !== id.id || user.email === "demo@demo.demo") return;

    return (
        <button onClick={() => setModalContent(<DeleteUser id={id.id} />)} className={css.button}>
            Delete your account
        </button>
    );
}
