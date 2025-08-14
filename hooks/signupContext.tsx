import { useContext, createContext, type PropsWithChildren, useState } from "react";

export type SignupData = {
    hn: string;
    firstName: string;
    middleName: string;
    lastName: string;
    phone: string;
    email: string;
    birthDate: number;
    pin: string;
};
const SignupContext = createContext<{
    signupData: SignupData;
    setSignupData: (signupData: SignupData) => void;
    validateFields: (fields: (keyof SignupData)[]) => keyof SignupData | null;
}>({
    signupData: { hn: "", firstName: "", middleName: "", lastName: "", phone: "", email: "", birthDate: 0, pin: "" },
    setSignupData: () => null,
    validateFields: () => null,
});

export function useSignupContext() {
    const val = useContext(SignupContext);
    return val;
}
export function SignupProvider({ children }: PropsWithChildren) {
    const [signupData, setSignupData] = useState<SignupData>({
        hn: "",
        firstName: "",
        middleName: "",
        lastName: "",
        phone: "",
        email: "",
        birthDate: 946659661,
        pin: "",
    });

    const validateFields = (fields: (keyof SignupData)[]) => {
        const EXCEPTIONFIELDS: (keyof SignupData)[] = ["middleName", "email"];
        for (let key of fields) {
            if (typeof signupData[key] === "number") continue;
            // @ts-ignore
            signupData[key] = signupData[key].trim(); // trim all inputs
            if (EXCEPTIONFIELDS.includes(key)) continue;
            if (signupData[key].length === 0) return key;
        }
        return null;
    };

    return (
        <SignupContext.Provider
            value={{ signupData: signupData, setSignupData: setSignupData, validateFields: validateFields }}
        >
            {children}
        </SignupContext.Provider>
    );
}
