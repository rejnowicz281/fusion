import MainSidebar from "@/components/sidebar/MainSidebar";
import UsersContainer from "@/components/sidebar/MainSidebar/UsersContainer";
import { AuthProvider } from "@/providers/AuthProvider";
import { PresenceProvider } from "@/providers/PresenceProvider";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import css from "./layout.module.css";

export default async function DashboardLayout({ children }) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const {
        data: { user },
    } = await supabase.auth.getUser();

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
}
