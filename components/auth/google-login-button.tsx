import googleSignIn from "@/actions/auth/modify/google-sign-in";
import SubmitButton from "@/components/general/submit-button";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "@react-icons/all-files/fc/FcGoogle";
import { VscLoading } from "@react-icons/all-files/vsc/VscLoading";

const GoogleLoginButton = () => {
    return (
        <form
            className="flex flex-col"
            action={async () => {
                await googleSignIn();
            }}
        >
            <Button
                asChild
                className="bg-blue-500 hover:bg-blue-400 dark:bg-blue-500 dark:hover:bg-blue-400 dark:text-white font-semibold flex flex-row items-center gap-1"
            >
                <SubmitButton
                    content={
                        <>
                            <div className="bg-white rounded-full">
                                <FcGoogle className="text-xl" />
                            </div>
                            Google
                        </>
                    }
                    loading={
                        <>
                            <VscLoading className="text-xl animate-spin" />
                            Google
                        </>
                    }
                />
            </Button>
        </form>
    );
};

export default GoogleLoginButton;
