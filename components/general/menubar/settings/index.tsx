import AiSection from "./ai-section";
import DeleteAccountButton from "./delete-account-button";
import EditAccountButton from "./edit-account-button";
import SignOutButton from "./sign-out-button";
import ThemeButton from "./theme-button";
import TogglePresenceButton from "./toggle-presence-button";
import TogglePromptsButton from "./toggle-prompts-button";
import UserBar from "./user-bar";

const Settings = () => {
    return (
        <div className="flex-1 flex flex-col justify-center xl:justify-normal pt-6 xl:p-6">
            <UserBar />
            <SignOutButton />
            <EditAccountButton demoUserId={process.env.DEMO_USER_ID!} />
            <DeleteAccountButton demoUserId={process.env.DEMO_USER_ID!} />
            <TogglePresenceButton />
            <TogglePromptsButton />
            <AiSection demoUserId={process.env.DEMO_USER_ID!} />
            <ThemeButton />
        </div>
    );
};

export default Settings;
