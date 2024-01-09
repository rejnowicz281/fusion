import { demoLogin } from "@/actions/auth";
import SubmitButton from "@/components/general/SubmitButton";
import { BiSolidSkipNextCircle } from "react-icons/bi";
import css from "./index.module.css";

export default function DemoLoginButton() {
    return (
        <form action={demoLogin}>
            <SubmitButton
                className={css.button}
                content={
                    <>
                        <BiSolidSkipNextCircle className={css.icon} />
                        Demo Login
                    </>
                }
                loading={
                    <>
                        <BiSolidSkipNextCircle className={css.icon} />
                        Logging in...
                    </>
                }
            />
        </form>
    );
}
