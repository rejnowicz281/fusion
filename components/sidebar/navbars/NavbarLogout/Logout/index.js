import { signOut } from "@/actions/auth";
import SubmitButton from "@/components/general/SubmitButton";
import css from "./index.module.css";

export default function Logout() {
    return (
        <form action={signOut}>
            <h3 className={css.sure}>Are you sure?</h3>
            <SubmitButton className={css.button} content="Logout" loading="Logging out..." />
        </form>
    );
}
