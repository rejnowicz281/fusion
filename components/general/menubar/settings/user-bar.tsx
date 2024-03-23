import PresenceAvatar from "@/components/general/presence-avatar";
import useAuthContext from "@/providers/auth-provider";

const UserBar = () => {
    const { user } = useAuthContext();

    return (
        <div className="truncate flex flex-col items-center gap-3 border-b pb-4 dark:border-b-neutral-800 border-b-neutral-300">
            <PresenceAvatar avatarSize={80} markerSize={18} userId={user.id} src={user.avatar_url} />
            <div className="truncate flex flex-col text-center">
                <div className="truncate dark:font-semibold">{user.display_name}</div>
                {user.email !== user.display_name && (
                    <div className="truncate text-sm font-semibold text-gray-500">{user.email}</div>
                )}
            </div>
        </div>
    );
};

export default UserBar;
