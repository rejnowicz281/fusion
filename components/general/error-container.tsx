import Link from "next/link";
import { FC } from "react";
import HardRefreshButton from "./hard-refresh-button";

type ErrorContainerProps = {
    error?: string;
};

const ErrorContainer: FC<ErrorContainerProps> = ({ error }) => {
    return (
        <div className="flex-1 flex flex-col justify-center items-center gap-3 p-5">
            <h1 className="text-4xl font-bold">Error</h1>
            <p className="text-gray-500 text-center">
                {process.env.NODE_ENV !== "production" && error ? error : "An error has occured while loading the page"}{" "}
                🤔
            </p>

            <div className="flex flex-col gap-2 text-gray-500">
                <p>You might wanna try...</p>
                <ul className="list-disc">
                    <li>Making sure the URL is correct</li>
                    <li>
                        <HardRefreshButton content="Refreshing the page" />
                    </li>
                    <li>
                        <Link className="text-blue-500 hover:underline" href="/login">
                            Logging in
                        </Link>
                    </li>
                    <li>
                        <Link className="text-blue-500 hover:underline" href="/">
                            Going back to the homepage
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ErrorContainer;
