export type User = {
    id: string;
    email: string;
    display_name: string;
    avatar_url: string;
    created_at: string;
    bookmark_id?: string;
    most_recent_message?: { created_at: string; text: string; sender_id: string };
};
