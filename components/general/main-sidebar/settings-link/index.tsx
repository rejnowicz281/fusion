import NavLink from "@/components/general/nav-link";
import css from "./index.module.css";

const SettingsLink = () => {
    return (
        <NavLink activeClassName={css.active} className={css.link} href="/settings">
            SETTINGS
        </NavLink>
    );
};

export default SettingsLink;
