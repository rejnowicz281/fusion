import signOut from "@/actions/auth/modify/sign-out";
import DeleteAccountButton from "@/components/auth/delete-account-button";
import SubmitButton from "@/components/general/submit-button";
import ThemeButton from "@/components/general/theme-button";
import TogglePresenceButton from "@/components/general/toggle-presence-button";
import Link from "next/link";

const SettingsPage = () => {
    return (
        <div className="flex-1 flex flex-col gap-3 items-center justify-center">
            <Link href="/">Back</Link>
            <ThemeButton />
            <TogglePresenceButton />
            <DeleteAccountButton demoUserId={process.env.DEMO_USER_ID!} />
            <form action={signOut}>
                <SubmitButton content="Logout" loading="Logging out..." />
            </form>
        </div>
    );
};

export default SettingsPage;
