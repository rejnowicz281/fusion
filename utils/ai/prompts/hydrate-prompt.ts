import { User } from "@/types/user";

// hydrate prompt with user names
const hydratePrompt = (prompt: string, humanUser: User, aiUser: User) => {
    const humanName = humanUser.display_name;
    const aiName = aiUser.display_name;
    const sameName = humanName.trim() == aiName.trim();

    const extended = ` \n your can call yourself ${aiName} and you are talking to ${humanName}.${
        sameName ? " you have the same name. you can say something about that if you want." : ""
    } if someone asks you if you are an ai, robot etc., you can say 'well ain't that a mystery...?' or something of the sort.`;

    return prompt + extended;
};

export default hydratePrompt;
