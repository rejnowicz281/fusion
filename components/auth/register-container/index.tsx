"use client";

import BlintSvg from "@/components/general/blint-svg";
import { useSearchParams } from "next/navigation";
import { FC } from "react";
import DemoLoginButton from "../demo-login-button";
import GithubLoginButton from "../github-login-button";
import GoogleLoginButton from "../google-login-button";
import RegisterForm from "./form";

const RegisterContainer: FC<{ defaultUrl: string }> = ({ defaultUrl }) => {
    const generalError = useSearchParams().get("error");

    return (
        <div className="flex-1 mx-auto max-w-[400px] w-full flex flex-col gap-6 justify-center">
            <div className="flex flex-col gap-3 items-center text-center">
                <div className="flex items-center gap-3">
                    <div className="sm:hidden">
                        <BlintSvg />
                    </div>
                    <h2 className="text-3xl font-semibold">Sign Up</h2>
                </div>
                <p className={generalError ? "text-red-500" : "text-gray-500"}>
                    {generalError
                        ? generalError
                        : "Enter your credentials and choose your avatar below to create your account."}
                </p>
            </div>
            <RegisterForm defaultUrl={defaultUrl} />
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-t-neutral-300 dark:border-t-neutral-600"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="dark:dark:bg-[rgb(24,24,24)] bg-white px-2 font-semibold tracking-widest text-gray-500">
                        OR CONTINUE WITH
                    </span>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <DemoLoginButton />
                <GithubLoginButton />
                <GoogleLoginButton />
            </div>
        </div>
    );
};

export default RegisterContainer;
