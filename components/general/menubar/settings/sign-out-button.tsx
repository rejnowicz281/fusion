import signOut from "@/actions/auth/modify/sign-out";
import SubmitButton from "@/components/general/submit-button";
import { BiExit } from "@react-icons/all-files/bi/BiExit";
import { VscLoading } from "@react-icons/all-files/vsc/VscLoading";
import SettingsButton from "./settings-button";

const SignOutButton = () => {
    return (
        <form
            className="flex flex-col"
            action={async () => {
                await signOut();
            }}
        >
            <SettingsButton asChild={true}>
                <SubmitButton
                    content={
                        <>
                            <BiExit />
                            Sign Out
                        </>
                    }
                    loading={
                        <>
                            <VscLoading className="animate-spin" />
                            Sign Out
                        </>
                    }
                />
            </SettingsButton>
        </form>
    );
};

export default SignOutButton;
