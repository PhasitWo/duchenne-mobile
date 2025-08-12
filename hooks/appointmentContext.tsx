import { useContext, createContext, type PropsWithChildren, useState } from "react";
import type { appointment } from "@/components/AppointmentCard";
import { useApiContext } from "./apiContext";
import { useAuthContext } from "./authContext";
import { AxiosError, AxiosResponse } from "axios";
import { ApiAppointmentModel } from "@/model/model";
import { Alert } from "react-native";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

const AppointmentContext = createContext<{
    apmntList: appointment[];
    setApmtList: Function;
    isLoading: boolean;
    fetch: () => void;
}>({
    apmntList: [],
    setApmtList: () => null,
    isLoading: true,
    fetch: () => null,
});

export function useAppointmentContext() {
    const val = useContext(AppointmentContext);
    return val;
}
export function AppointmentProvider({ children }: PropsWithChildren) {
    const [apmntList, setApmtList] = useState<appointment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { t } = useTranslation();

    const { api } = useApiContext();
    const { logoutDispatch } = useAuthContext();
    const fetch = async () => {
        setIsLoading(true);
        try {
            const response = await api.get<any, AxiosResponse<ApiAppointmentModel[], any>, any>("/api/appointment");
            switch (response.status) {
                case 200:
                    setApmtList(
                        response.data.map((v) => ({
                            id: v.id,
                            dateTime: dayjs(v.date * 1000),
                            doctor: `${v.doctor.firstName} ${v.doctor.middleName ?? ""} ${v.doctor.lastName}`,
                            specialist: v.doctor.specialist,
                            approveAt: v.approveAt,
                        }))
                    );
                    break;
                case 401:
                    Alert.alert(t("common.alert.error"), t("common.alert.401"));
                    logoutDispatch();
                    break;
                default:
                    Alert.alert("Something went wrong...", JSON.stringify(response));
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                Alert.alert("Request Error", `${err.message ?? ""} ${err.code}`);
            } else {
                Alert.alert("Fatal Error", `${err as Error}`);
            }
            setApmtList([]);
        } finally {
            setIsLoading(false);
        }
    };
    // useEffect(() => {
    //     fetch();
    // }, []);

    return (
        <AppointmentContext.Provider
            value={{
                apmntList: apmntList,
                setApmtList: setApmtList,
                isLoading: isLoading,
                fetch: fetch,
            }}
        >
            {children}
        </AppointmentContext.Provider>
    );
}

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
