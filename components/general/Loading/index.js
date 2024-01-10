import { ImSpinner2 } from "react-icons/im";
import css from "./index.module.css";

export default function Loading({ spinnerSize = "50px" }) {
    return (
        <div className={css.wrapper}>
            <ImSpinner2 style={{ fontSize: spinnerSize }} className={css.spinner} />
        </div>
    );
}
