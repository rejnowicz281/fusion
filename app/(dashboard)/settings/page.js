import { signOut } from "@/actions/auth";
import DeleteAccountButton from "@/components/auth/DeleteAccountButton";
import SubmitButton from "@/components/general/SubmitButton";

export default function SettingsPage() {
    return (
        <>
            <DeleteAccountButton demoUserId={process.env.DEMO_USER_ID} />
            <form action={signOut}>
                <SubmitButton content="Logout" loading="Logging out..." />
            </form>
        </>
    );
}
