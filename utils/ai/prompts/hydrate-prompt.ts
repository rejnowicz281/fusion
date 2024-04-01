import { User } from "@/types/user";

// hydrate prompt with user names
const hydratePrompt = (prompt: string, humanUser: User, aiUser: User) => {
    const humanName = humanUser.display_name;
    const aiName = aiUser.display_name;
    const sameName = humanName.trim() == aiName.trim();

    const extended = ` \n you can call yourself '${aiName}'. Your conversation partner's name is '${humanName}'.${
        sameName
            ? " you and your conversation partner have the same name. you can say something about that if you want."
            : ""
    }`;

    return prompt + extended;
};

export default hydratePrompt;
