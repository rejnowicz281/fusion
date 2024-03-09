import signOut from "@/actions/auth/modify/sign-out";
import DeleteAccountButton from "@/components/auth/delete-account-button";
import SubmitButton from "@/components/general/submit-button";
import TogglePresenceButton from "@/components/general/toggle-presence-button";
import css from "./page.module.css";

const SettingsPage = () => {
    return (
        <div className={css.container}>
            <TogglePresenceButton />
            <DeleteAccountButton demoUserId={process.env.DEMO_USER_ID!} />
            <form action={signOut}>
                <SubmitButton content="Logout" loading="Logging out..." />
            </form>
        </div>
    );
};

export default SettingsPage;
