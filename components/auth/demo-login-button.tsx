import demoLogin from "@/actions/auth/modify/demo-login";
import SubmitButton from "@/components/general/submit-button";
import { Button } from "@/components/ui/button";
import { BiSolidSkipNextCircle } from "@react-icons/all-files/bi/BiSolidSkipNextCircle";
import { VscLoading } from "@react-icons/all-files/vsc/VscLoading";

const DemoLoginButton = () => {
    return (
        <form
            className="flex flex-col"
            action={async () => {
                await demoLogin();
            }}
        >
            <Button
                asChild
                className="bg-inherit hover:bg-gray-100 text-black border border-neutral-300 flex flex-row items-center gap-1"
            >
                <SubmitButton
                    content={
                        <>
                            <BiSolidSkipNextCircle className="text-xl" />
                            Demo Login
                        </>
                    }
                    loading={
                        <>
                            <VscLoading className="text-xl animate-spin" />
                            Demo Login
                        </>
                    }
                />
            </Button>
        </form>
    );
};

export default DemoLoginButton;
