import getCurrentUser from "@/actions/auth/read/get-current-user";
import Menubar from "@/components/general/menubar/menubar-wrapper";
import { AuthProvider } from "@/providers/auth-provider";
import { DashboardProvider } from "@/providers/dashboard-provider";
import { PresenceProvider } from "@/providers/presence-provider";
import { FC, ReactNode } from "react";

const DashboardLayout: FC<{ children: ReactNode }> = async ({ children }) => {
    const { user } = await getCurrentUser();

    return (
        <AuthProvider user={user}>
            <PresenceProvider>
                <DashboardProvider Menubar={<Menubar />}>{children}</DashboardProvider>
            </PresenceProvider>
        </AuthProvider>
    );
};

export default DashboardLayout;
