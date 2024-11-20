import { useContext, createContext, type PropsWithChildren, useState } from "react";
import type { SignupData } from "./authContext";


const SignupContext = createContext<{ signupData: SignupData; setSignupData: (signupData: SignupData) => void }>({
    signupData: { hn: "", firstName: "", middleName: "", lastName: "", phone: "", email: "" },
    setSignupData: () => null,
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
    });

    return (
        <SignupContext.Provider value={{ signupData: signupData, setSignupData: setSignupData }}>
            {children}
        </SignupContext.Provider>
    );
}
