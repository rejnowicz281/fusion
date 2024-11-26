"use client";

import signUp from "@/actions/auth/modify/sign-up";
import PasswordInput from "@/components/general/password-input";
import SubmitButton from "@/components/general/submit-button";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AvatarPicker from "@/components/users/avatar-picker";
import useRegisterForm from "@/utils/forms/register-form";
import { VscLoading } from "@react-icons/all-files/vsc/VscLoading";
import { useSearchParams } from "next/navigation";
import { FC } from "react";

const RegisterForm: FC<{ defaultUrl: string }> = ({ defaultUrl }) => {
    const { form, onSubmitClick } = useRegisterForm();

    const params = useSearchParams();
    const emailError = params.get("email-error");
    const nameError = params.get("display-name-error");
    const passwordError = params.get("password-error");

    return (
        <Form {...form}>
            <form
                action={async (formData) => {
                    await signUp(formData);
                }}
                className="flex flex-col gap-6"
            >
                <div className="flex justify-center">
                    <AvatarPicker defaultUrl={defaultUrl} />
                </div>
                <div className="flex flex-col gap-2">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="grid grid-cols-4 items-center">
                                <FormLabel className="text-right pr-3">Email</FormLabel>
                                <FormControl className="col-span-3">
                                    <Input placeholder="name@example.com" {...field} />
                                </FormControl>
                                <FormMessage className="col-start-2 pl-3 py-1 col-span-3 !text-red-500 text-sm">
                                    {emailError}
                                </FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="display_name"
                        render={({ field }) => (
                            <FormItem className="grid grid-cols-4 items-center">
                                <FormLabel className="text-right pr-3">Name</FormLabel>
                                <FormControl className="col-span-3">
                                    <Input placeholder="John" {...field} />
                                </FormControl>
                                <FormMessage className="col-start-2 pl-3 py-1 col-span-3 text-sm">
                                    {nameError}
                                </FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="grid grid-cols-4 items-center">
                                <FormLabel className="text-right pr-3">Password</FormLabel>
                                <FormControl className="col-span-3">
                                    <PasswordInput field={field} />
                                </FormControl>
                                <FormMessage className="col-start-2 pl-3 py-1 col-span-3 text-sm">
                                    {passwordError}
                                </FormMessage>
                            </FormItem>
                        )}
                    />
                </div>
                <Button
                    asChild
                    className="dark:bg-zinc-800 dark:text-white dark:border dark:border-neutral-700 dark:hover:bg-zinc-700 font-semibold flex items-center gap-1"
                >
                    <SubmitButton
                        onClick={onSubmitClick}
                        content="Sign Up with Email"
                        loading={<VscLoading className="animate-spin" />}
                    />
                </Button>
            </form>
        </Form>
    );
};

export default RegisterForm;
