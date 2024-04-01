export type User = {
    id: string;
    email: string;
    display_name: string;
    avatar_url: string;
    created_at: string;
    ai_mode?: boolean;
    ai_prompt?: string;
    bookmark_id?: string;
    provider?: string;
    most_recent_message?: { created_at: string; text: string; sender_id: string };
};
