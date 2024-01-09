import { deleteUser } from "@/actions/auth";
import AsyncButton from "@/components/general/AsyncButton";
import useModalContext from "@/providers/ModalContext";
import css from "./index.module.css";

export default function DeleteUser({ id }) {
    const { closeModal } = useModalContext();

    return (
        <>
            <h3 className={css.sure}>Are you sure?</h3>
            <AsyncButton
                className={css.button}
                content="Delete your account"
                loading="Deleting..."
                onClick={async () => {
                    await deleteUser(id);
                    closeModal();
                }}
            />
        </>
    );
}
