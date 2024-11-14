import { useContext, createContext, useEffect, type PropsWithChildren, useState } from "react";
import type { appointment } from "@/components/AppointmentCard";

const AppointmentContext = createContext<{ apmntList: Array<appointment>; setApmtList: Function }>({
    apmntList: [],
    setApmtList: () => null,
});

export function useAppointmentContext() {
    const val = useContext(AppointmentContext);
    return val;
}
export function AppointmentProvider({ children }: PropsWithChildren) {
    const [apmntList, setApmtList] = useState<appointment[]>([]);

    

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
        <AppointmentContext.Provider value={{ apmntList: apmntList, setApmtList: setApmtList }}>
            {children}
        </AppointmentContext.Provider>
    );
}
