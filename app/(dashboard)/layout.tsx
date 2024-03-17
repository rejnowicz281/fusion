import getCurrentUser from "@/actions/auth/read/get-current-user";
import { AuthProvider } from "@/providers/auth-provider";
import { PresenceProvider } from "@/providers/presence-provider";
import { FC, ReactNode } from "react";

const DashboardLayout: FC<{ children: ReactNode }> = async ({ children }) => {
    const { user } = await getCurrentUser();

    return (
        <AuthProvider user={user}>
            <PresenceProvider>{children}</PresenceProvider>
        </AuthProvider>
    );
};

export default DashboardLayout;
