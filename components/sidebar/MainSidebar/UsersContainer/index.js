import { getAllUsers } from "@/actions/users";
import Users from "./Users";

export default async function UsersContainer() {
    const users = await getAllUsers();

    return <Users users={users} />;
}
