import { useContext, createContext, type PropsWithChildren, useState } from "react";
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
    const [apmntList, setApmtList] = useState([]);

    return (
        <AppointmentContext.Provider value={{ apmntList: apmntList, setApmtList: setApmtList }}>
            {children}
        </AppointmentContext.Provider>
    );
}
