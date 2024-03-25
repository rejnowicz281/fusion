import DeleteAccountButton from "./delete-account-button";
import EditAccountButton from "./edit-account-button";
import PromptLanguageButton from "./prompt-language-button";
import SignOutButton from "./sign-out-button";
import ThemeButton from "./theme-button";
import TogglePresenceButton from "./toggle-presence-button";
import UserBar from "./user-bar";

const Settings = () => {
    return (
        <div className="flex-1 flex flex-col justify-center xl:justify-normal xl:p-6">
            <UserBar />
            <SignOutButton />
            <EditAccountButton demoUserId={process.env.DEMO_USER_ID!} />
            <DeleteAccountButton demoUserId={process.env.DEMO_USER_ID!} />
            <TogglePresenceButton />
            <PromptLanguageButton />
            <ThemeButton />
        </div>
    );
};

export default Settings;
