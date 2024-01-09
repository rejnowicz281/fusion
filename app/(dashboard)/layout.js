import MainSidebar from "@/components/sidebar/MainSidebar";
import NavbarUsers from "@/components/sidebar/navbars/NavbarUsers";
import { AuthProvider } from "@/providers/AuthProvider";
import { ModalProvider } from "@/providers/ModalContext";
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
            <ModalProvider>
                <PresenceProvider>
                    <div className={css.container}>
                        <MainSidebar NavbarUsers={<NavbarUsers />} />
                        <main className={css.main}>{children}</main>
                    </div>
                </PresenceProvider>
            </ModalProvider>
        </AuthProvider>
    );
}
