import signIn from "@/actions/auth/modify/sign-in";
import FormMessages from "@/components/auth/form-messages";
import SubmitButton from "@/components/general/submit-button";
import Link from "next/link";
import cssAuth from "../index.module.css";

const LoginContainer = () => {
    return (
        <div className={cssAuth.container}>
            <h2 className={cssAuth.heading}>Login</h2>
            <FormMessages />
            <form action={signIn}>
                <div className={cssAuth["form-field"]}>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="Enter your email" />
                </div>
                <div className={cssAuth["form-field"]}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter your password" />
                </div>
                <SubmitButton className={cssAuth.continue} content="Continue" loading="Proceeding..." />
            </form>
            <div className={cssAuth["auth-link-container"]}>
                Don't have an account? <Link href="/register">Register</Link>
            </div>
        </div>
    );
};

export default LoginContainer;
