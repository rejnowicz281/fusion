import { FC, ReactNode, createContext, useContext, useState } from "react";

const SettingsContext = createContext<{
    promptsOn: boolean;
    setPromptsOn: React.Dispatch<React.SetStateAction<boolean>>;
    togglePrompts: () => void;
} | null>(null);

export const SettingsProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [promptsOn, setPromptsOn] = useState(true);

    const togglePrompts = () => setPromptsOn(!promptsOn);

    return (
        <SettingsContext.Provider value={{ togglePrompts, setPromptsOn, promptsOn }}>
            {children}
        </SettingsContext.Provider>
    );
};

const useSettingsContext = () => {
    const context = useContext(SettingsContext);

    if (!context) throw new Error("useSettingsContext must be used within a SettingsContext Provider");

    return context;
};

export default useSettingsContext;
