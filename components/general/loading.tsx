import { VscLoading } from "@react-icons/all-files/vsc/VscLoading";

const Loading = ({ spinnerSize = 50 }) => {
    return (
        <div className="flex-1 flex justify-center items-center">
            <VscLoading style={{ fontSize: spinnerSize }} className="animate-spin" />
        </div>
    );
};

export default Loading;
