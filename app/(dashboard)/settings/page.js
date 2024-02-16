import { signOut } from "@/actions/auth";
import DeleteAccountButton from "@/components/auth/DeleteAccountButton";
import SubmitButton from "@/components/general/SubmitButton";
import TogglePresenceButton from "@/components/general/TogglePresenceButton";
import css from "./page.module.css";

export default function SettingsPage() {
    return (
        <div className={css.container}>
            <TogglePresenceButton />
            <DeleteAccountButton demoUserId={process.env.DEMO_USER_ID} />
            <form action={signOut}>
                <SubmitButton content="Logout" loading="Logging out..." />
            </form>
        </div>
    );
}
