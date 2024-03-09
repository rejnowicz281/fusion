import { User } from "./user";

export type Message = {
    id: string;
    created_at: string;
    text: string;
    sender: User;
    recipient?: User;
    timestamp?: boolean;
    loading?: boolean;
};
