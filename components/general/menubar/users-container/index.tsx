import getAllUsers from "@/actions/users/read/get-all-users";
import UsersList from "./users-list";

const UsersContainer = async () => {
    const { users } = await getAllUsers();

    return <UsersList users={users} />;
};

export default UsersContainer;
