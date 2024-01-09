import DemoLoginButton from "@/components/auth/DemoLoginButton";
import css from "./layout.module.css";

export default function AuthLayout({ children }) {
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
}
