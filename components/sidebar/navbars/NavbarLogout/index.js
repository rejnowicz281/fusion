import useModalContext from "@/providers/ModalContext";
import cssNavbar from "../index.module.css";
import Logout from "./Logout";

export default function NavbarLogout() {
    const { setModalContent } = useModalContext();

    return (
        <div className={cssNavbar.container}>
            <div className={cssNavbar["main-buttons"]}>
                <button onClick={() => setModalContent(<Logout />)} className={cssNavbar["main-button"]}>
                    Logout
                </button>
            </div>
        </div>
    );
}
