import signUp from "@/actions/auth/modify/sign-up";
import FormMessages from "@/components/auth/form-messages";
import ImagePicker from "@/components/general/image-picker";
import SubmitButton from "@/components/general/submit-button";
import Link from "next/link";
import cssAuth from "../index.module.css";
import cssRegister from "./index.module.css";

const RegisterContainer = () => {
    return (
        <div className={cssAuth.container}>
            <h2 className={cssAuth.heading}>Register</h2>
            <FormMessages />
            <form action={signUp}>
                <div className={cssAuth["form-field"]}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Enter your email" />
                </div>
                <div className={cssAuth["form-field"]}>
                    <label htmlFor="display_name">Display Name</label>
                    <input type="text" name="display_name" id="display_name" placeholder="John Doe" />
                </div>
                <div className={cssRegister["double-form-field"]}>
                    <div className={cssAuth["form-field"]}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter your password" />
                    </div>
                    <div className={cssAuth["form-field"]}>
                        <label htmlFor="password-confirm">Confirm Password</label>
                        <input
                            type="password"
                            id="password-confirm"
                            name="password-confirm"
                            placeholder="Confirm your password"
                        />
                    </div>
                </div>
                <div className={cssAuth["form-field"]}>
                    <label htmlFor="avatar">Avatar (optional)</label>
                    <ImagePicker id="avatar" name="avatar" />
                </div>
                <SubmitButton className={cssAuth.continue} content="Continue" loading="Proceeding..." />
            </form>
            <div className={cssAuth["auth-link-container"]}>
                Already have an account? <Link href="/login">Log In</Link>
            </div>
        </div>
    );
};

export default RegisterContainer;
