import signOut from "@/actions/auth/modify/sign-out";
import SubmitButton from "../../submit-button";
import BackButton from "./back-button";
import DeleteAccountButton from "./delete-account-button";
import ThemeButton from "./theme-button";
import TogglePresenceButton from "./toggle-presence-button";

const Settings = () => {
    return (
        <div className="flex-1 flex flex-col">
            <BackButton />
            <ThemeButton />
            <TogglePresenceButton />
            <DeleteAccountButton demoUserId={process.env.DEMO_USER_ID!} />
            <form action={signOut}>
                <SubmitButton content="Logout" loading="Logging out..." />
            </form>
        </div>
    );
};

export default Settings;
