import css from "./index.module.css";

export default function Loading() {
    return (
        <div className={css.wrapper}>
            <div className={css.loading}>Loading...</div>
        </div>
    );
}
