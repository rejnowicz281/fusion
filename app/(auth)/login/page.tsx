import LoginContainer from "@/components/auth/login-container";
import FusionSvg from "@/components/general/fusion-svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const LoginPage = () => {
    return (
        <div className="flex-1 flex flex-col sm:flex-col-reverse">
            <div className="p-4 flex-1 flex flex-col">
                <LoginContainer />
            </div>
            <div className="sm:p-4 flex justify-between items-center">
                <div className="hidden sm:flex gap-3 text-3xl items-center">
                    <FusionSvg />
                    <h1 className="tracking-widest">fusion</h1>
                </div>
                <Button
                    asChild
                    variant="ghost"
                    className="text-xl border-t border-t-neutral-300 dark:border-t-neutral-800 sm:border-t-0 rounded-none sm:rounded-md flex-1 h-12 sm:h-10 sm:flex-initial"
                >
                    <Link href="/register">Register</Link>
                </Button>
            </div>
        </div>
    );
};

export default LoginPage;
