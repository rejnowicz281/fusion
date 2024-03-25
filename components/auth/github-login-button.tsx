import githubSignIn from "@/actions/auth/modify/github-sign-in";
import SubmitButton from "@/components/general/submit-button";
import { Button } from "@/components/ui/button";
import { BsGithub } from "@react-icons/all-files/bs/BsGithub";
import { VscLoading } from "@react-icons/all-files/vsc/VscLoading";

const GithubLoginButton = () => {
    return (
        <form className="flex flex-col" action={githubSignIn}>
            <Button
                asChild
                className="dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800 dark:border dark:border-neutral-700 flex flex-row font-semibold items-center gap-1"
            >
                <SubmitButton
                    content={
                        <>
                            <BsGithub className="text-xl" />
                            Github
                        </>
                    }
                    loading={
                        <>
                            <VscLoading className="text-xl animate-spin" />
                            Github
                        </>
                    }
                />
            </Button>
        </form>
    );
};

export default GithubLoginButton;
