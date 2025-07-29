import { useContext, createContext, useEffect, type PropsWithChildren, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKey } from "@/constants/AsyncStorageKey";
import "dayjs/locale/th.js";

export type Language = "th" | "en";
type LangFunc = (thaiString: string, engString: string) => string;
type ChangeLangFunc = (language: Language) => void;

const LanguageContext = createContext<{ lang: LangFunc; currentLang: Language; changeLang: ChangeLangFunc }>({
    lang: (thaiString, engString) => thaiString,
    currentLang: "th",
    changeLang: () => null,
});

export function useLanguage() {
    const val = useContext(LanguageContext);
    return val;
}
export function LanguageProvider({ children }: PropsWithChildren) {
    const [currentLang, setCurrentLang] = useState<Language>("th");
    // get current lang setting
    useEffect(() => {
        getLangSetting();
    }, []);

    const getLangSetting = async () => {
        try {
            let res = await AsyncStorage.getItem(AsyncStorageKey.language);
            if (res === null) {
                await AsyncStorage.setItem(AsyncStorageKey.language, "th");
                return;
            }
            setCurrentLang(res as Language);
        } catch (err) {
            console.log("Can't get lang from AsyncStorage", err);
        }
    };
    // hook function
    const lang: LangFunc = (thaiString, engString) => {
        return currentLang === "th" ? thaiString : engString;
    };

    const changeLang: ChangeLangFunc = async (language) => {
        try {
            await AsyncStorage.setItem(AsyncStorageKey.language, language);
            setCurrentLang(language);
        } catch (err) {
            console.log("Can't save lang to AsyncStorage", err);
        }
    };
    return (
        <LanguageContext.Provider value={{ lang: lang, currentLang: currentLang, changeLang: changeLang }}>
            {children}
        </LanguageContext.Provider>
    );
}
