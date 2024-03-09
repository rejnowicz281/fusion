import { VscLoading } from "@react-icons/all-files/vsc/VscLoading";
import css from "./index.module.css";

const Loading = ({ spinnerSize = "50px" }) => {
    return (
        <div className={css.wrapper}>
            <VscLoading style={{ fontSize: spinnerSize }} className={css.spinner} />
        </div>
    );
};

export default Loading;
