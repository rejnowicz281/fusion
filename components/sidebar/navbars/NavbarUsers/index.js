import { getAllUsers } from "@/actions/users";
import cssNavbar from "../index.module.css";
import NavbarUsersMain from "./NavbarUsersMain";

export default async function NavbarUsers() {
    const users = await getAllUsers();

    return (
        <nav className={cssNavbar.container}>
            <NavbarUsersMain users={users} />
        </nav>
    );
}
