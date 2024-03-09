import demoLogin from "@/actions/auth/modify/demo-login";
import SubmitButton from "@/components/general/submit-button";
import { BiSolidSkipNextCircle } from "@react-icons/all-files/bi/BiSolidSkipNextCircle";
import css from "./index.module.css";

const DemoLoginButton = () => {
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
};

export default DemoLoginButton;
