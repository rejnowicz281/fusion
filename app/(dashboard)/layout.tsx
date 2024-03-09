import getCurrentUser from "@/actions/auth/read/get-current-user";
import MainSidebar from "@/components/general/main-sidebar";
import UsersContainer from "@/components/general/main-sidebar/users-container";
import { AuthProvider } from "@/providers/auth-provider";
import { PresenceProvider } from "@/providers/presence-provider";
import { FC, ReactNode } from "react";
import css from "./layout.module.css";

const DashboardLayout: FC<{ children: ReactNode }> = async ({ children }) => {
    const { user } = await getCurrentUser();

    return (
        <AuthProvider user={user}>
            <PresenceProvider>
                <div className={css.container}>
                    <MainSidebar UsersContainer={<UsersContainer />} />
                    <main className={css.main}>{children}</main>
                </div>
            </PresenceProvider>
        </AuthProvider>
    );
};

export default DashboardLayout;
