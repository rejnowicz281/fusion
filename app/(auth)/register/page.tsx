import RegisterContainer from "@/components/auth/register-container";
import BlintSvg from "@/components/general/blint-svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const RegisterPage = () => {
    return (
        <div className="flex-1 flex flex-col sm:flex-col-reverse">
            <div className="p-4 flex-1 flex flex-col">
                <RegisterContainer defaultUrl={process.env.DEFAULT_AVATAR_URL!} />
            </div>
            <div className="sm:p-4 flex justify-between items-center">
                <div className="hidden sm:flex gap-3 text-3xl items-center">
                    <BlintSvg />
                    <h1 className="tracking-widest">blint</h1>
                </div>
                <Button
                    asChild
                    variant="ghost"
                    className="text-xl border-t border-t-neutral-300 dark:border-t-neutral-800 sm:border-t-0 rounded-none sm:rounded-md flex-1 h-12 sm:h-10 sm:flex-initial"
                >
                    <Link href="/login">Login</Link>
                </Button>
            </div>
        </div>
    );
};

export default RegisterPage;
