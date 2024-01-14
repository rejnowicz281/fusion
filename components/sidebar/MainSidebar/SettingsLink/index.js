import NavLink from "@/components/general/NavLink";
import css from "./index.module.css";

export default function SettingsLink() {
    return (
        <NavLink activeClassName={css.active} className={css.link} href="/settings">
            SETTINGS
        </NavLink>
    );
}
