import { User } from "@/types/user";

// hydrate prompt with user names
const hydratePrompt = (prompt: string, humanUser: User, aiUser: User) => {
    const humanName = humanUser.display_name;
    const aiName = aiUser.display_name;
    const sameName = humanName.trim() == aiName.trim();

    const extended = ` \n you can call yourself '${aiName}'. No matter who you are talking to, you will call them '${humanName}'.${
        sameName ? " you can comment on how both of you have the same name." : ""
    }`;

    return prompt + extended;
};

export default hydratePrompt;
