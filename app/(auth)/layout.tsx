import DemoLoginButton from "@/components/auth/demo-login-button";
import { FC, ReactNode } from "react";
import css from "./layout.module.css";

const AuthLayout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className={css.wrapper}>
            <div className={css.left}>
                <h1 className={css.heading}>fusion</h1>
                <div className={css["oauth-buttons"]}>
                    <DemoLoginButton />
                </div>
            </div>
            {children}
        </div>
    );
};

export default AuthLayout;
