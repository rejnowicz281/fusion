import Menubar from ".";
import UsersContainer from "./users-container";

const MenubarWrapper = () => {
    return <Menubar UsersContainer={<UsersContainer />} />;
};

export default MenubarWrapper;
