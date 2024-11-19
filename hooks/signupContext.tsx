import { useContext, createContext, useEffect, type PropsWithChildren, useState } from "react";
import type { appointment } from "@/components/AppointmentCard";

type SignupData = {
    hn: string;
    firstName: string;
    middleName: string;
    lastName: string;
    phone: string;
    email: string;
};

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

    // async function fetchLocalAppointmentList(): Promise<localAppointment[]> {
    //     let ret: localAppointment[] = [];
    //     let res = await AsyncStorage.getItem(AsyncStorageKey.appointment);
    //     // parse json to object
    //     if (res !== null) {
    //         let convertedApmtList: localAppointment[] = [];
    //         let apmtList: any[] = JSON.parse(res);
    //         // console.log("before" , typeof apmtList[0].date)
    //         for (let i = 0; i < apmtList.length; i++) {
    //             // convert apmt date
    //             apmtList[i] = { ...apmtList[i], date: new Date(apmtList[i].date) };
    //             // convert notifications date
    //             let rawNotifications = apmtList[i].notifications;
    //             for (let noti of rawNotifications) {
    //                 noti.trigger = { ...noti.trigger, date: new Date(noti.trigger.date) };
    //             }
    //         }
    //         ret = apmntList;
    //         setApmtList(ret)
    //         //  console.log("after",  apmtList[0].notifications[0].trigger.date instanceof Date);
    //     }
    //     return ret;
    // }

    return (
        <SignupContext.Provider value={{ signupData: signupData, setSignupData: setSignupData }}>
            {children}
        </SignupContext.Provider>
    );
}
