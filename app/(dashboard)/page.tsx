import css from "./page.module.css";

export default async function Home() {
    return (
        <div className={css.container}>
            <h1 className={css.heading}>Fusion.</h1>
        </div>
    );
}
