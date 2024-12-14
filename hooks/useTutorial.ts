import { AsyncStorageKey } from "@/constants/AsyncStorageKey";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getShowAppointmentTutorial(): Promise<boolean> {
    let res = await AsyncStorage.getItem(AsyncStorageKey.showAppointmentTutorial);
    if (res === null || res === "") {
        return false;
    }
    return true;
}

export async function setShowAppointmentTutorial(show: boolean): Promise<void> {
    await AsyncStorage.setItem(AsyncStorageKey.showAppointmentTutorial, show ? "show" : "");
}

export async function getShowAskTutorial(): Promise<boolean> {
    let res = await AsyncStorage.getItem(AsyncStorageKey.showAskTutorial);
    if (res === null || res === "") {
        return false;
    }
    return true;
}

export async function setShowAskTutorial(show: boolean): Promise<void> {
    await AsyncStorage.setItem(AsyncStorageKey.showAskTutorial, show ? "show" : "");
}

export default function useTutorial() {
    return {
        getShowAppointmentTutorial: getShowAppointmentTutorial,
        setShowAppointmentTutorial: setShowAppointmentTutorial,
        getShowAskTutorial: getShowAskTutorial,
        setShowAskTutorial: setShowAskTutorial,
    };
}