import CurrentUser from "./current-user";
import UsersContainer from "./users-container";

const Menubar = () => {
    return (
        <>
            <UsersContainer />
            <CurrentUser />
        </>
    );
};

export default Menubar;
