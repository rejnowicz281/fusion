import { FC, ReactNode, createContext, useContext, useState } from "react";

const SettingsContext = createContext<{
    englishPrompts: boolean;
    setEnglishPrompts: React.Dispatch<React.SetStateAction<boolean>>;
    toggleEnglishPrompts: () => void;
} | null>(null);

export const SettingsProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [englishPrompts, setEnglishPrompts] = useState(true);

    const toggleEnglishPrompts = () => setEnglishPrompts(!englishPrompts);

    return (
        <SettingsContext.Provider value={{ englishPrompts, setEnglishPrompts, toggleEnglishPrompts }}>
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
