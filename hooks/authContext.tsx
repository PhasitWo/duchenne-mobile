import {
    useContext,
    createContext,
    useEffect,
    type PropsWithChildren,
    useReducer,
    useMemo,
    useRef,
    useState,
} from "react";
import authReducer, { AuthActionEnum, AuthState } from "./authReducer";
import * as SecureStore from "expo-secure-store";
import { SecureStoreKey } from "@/constants/SecureStorageKey";
import useTutorial from "./useTutorial";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKey } from "@/constants/AsyncStorageKey";
import dayjs, { Dayjs } from "dayjs";

type LoginDispatch = (userToken: string, hn?: string) => Promise<void>;
type LogoutDispatch = () => void;
type GetLastLoginHN = () => Promise<string>;

const initialState: AuthState = {
    isLoading: true,
    userToken: null,
};

const AuthContext = createContext<{
    authState: AuthState;
    loginDispatch: LoginDispatch;
    logoutDispatch: LogoutDispatch;
    getLastLoginHN: GetLastLoginHN;
    increaseFailedLoginAttempts: () => Promise<void>;
    lockedUntil: Dayjs | null;
    setLockedUntil: (value: Dayjs | null) => void;
}>({
    authState: { isLoading: true, userToken: null },
    loginDispatch: async () => {},
    logoutDispatch: () => null,
    getLastLoginHN: async () => "",
    increaseFailedLoginAttempts: async () => {},
    lockedUntil: null,
    setLockedUntil: () => {},
});

export function useAuthContext() {
    const val = useContext(AuthContext);
    return val;
}
export function AuthProvider({ children }: PropsWithChildren) {
    const [authState, dispatch] = useReducer(authReducer, initialState);
    const { setShowAppointmentTutorial, setShowAskTutorial } = useTutorial();
    const failedLoginAttemptsCnt = useRef(0);
    const [lockedUntil, setLockedUntil] = useState<Dayjs | null>(null);
    const { loginDispatch, logoutDispatch, getLastLoginHN } = useMemo<{
        loginDispatch: LoginDispatch;
        logoutDispatch: LogoutDispatch;
        getLastLoginHN: GetLastLoginHN;
    }>(
        () => ({
            loginDispatch: async (userToken, hn) => {
                if (hn) await AsyncStorage.setItem(AsyncStorageKey.lastLoginHN, hn);
                await SecureStore.setItemAsync(SecureStoreKey.USER_TOKEN, userToken);
                setShowAppointmentTutorial(true);
                setShowAskTutorial(true);
                dispatch({ type: AuthActionEnum.LOGIN, userToken: userToken });
                // reset lock logic
                failedLoginAttemptsCnt.current = 0;
                setLockedUntil(null);
                AsyncStorage.removeItem(AsyncStorageKey.lockUntil);
                AsyncStorage.removeItem(AsyncStorageKey.lastLockDuration);
                AsyncStorage.removeItem(AsyncStorageKey.resetLockDurationAt);
            },
            logoutDispatch: async () => {
                await SecureStore.deleteItemAsync(SecureStoreKey.USER_TOKEN);
                dispatch({ type: AuthActionEnum.LOGOUT });
            },
            getLastLoginHN: async () => {
                const hn = await AsyncStorage.getItem(AsyncStorageKey.lastLoginHN);
                await AsyncStorage.removeItem(AsyncStorageKey.lastLoginHN);
                return hn ?? "";
            },
        }),
        []
    );
    const increaseFailedLoginAttempts = async () => {
        failedLoginAttemptsCnt.current++;
        if (failedLoginAttemptsCnt.current >= 5) {
            failedLoginAttemptsCnt.current = 0; // reset

            let lastLockDurationStr = (await AsyncStorage.getItem(AsyncStorageKey.lastLockDuration)) ?? 2.5;
            let newlockDuration = Number(lastLockDurationStr) * 4;

            const resetLockDurationAtstr = await AsyncStorage.getItem(AsyncStorageKey.resetLockDurationAt);
            if (resetLockDurationAtstr) {
                if (dayjs().unix() >= Number(resetLockDurationAtstr)) {
                    newlockDuration = 10; // reset lock duration
                    AsyncStorage.setItem(AsyncStorageKey.resetLockDurationAt, String(dayjs().add(30, "minute").unix()));
                }
            } else {
                AsyncStorage.setItem(AsyncStorageKey.resetLockDurationAt, String(dayjs().add(30, "minute").unix()));
            }
            const lockedUntil = dayjs().add(newlockDuration, "seconds");
            setLockedUntil(lockedUntil);
            // save this state to use in the future
            AsyncStorage.setItem(AsyncStorageKey.lockUntil, String(lockedUntil.unix()));
            AsyncStorage.setItem(AsyncStorageKey.lastLockDuration, String(newlockDuration));
        }
    };
    const restoreStates = async () => {
        let result = null;
        try {
            result = await SecureStore.getItemAsync(SecureStoreKey.USER_TOKEN);
            const lockUntilStr = await AsyncStorage.getItem(AsyncStorageKey.lockUntil);
            if (lockUntilStr) setLockedUntil(dayjs(Number(lockUntilStr) * 1000));
        } catch (err) {
            alert(`Error restoring states: ${err}`);
        } finally {
            dispatch({ type: AuthActionEnum.RESTORE, userToken: result });
        }
    };
    useEffect(() => {
        restoreStates();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                authState: authState,
                loginDispatch: loginDispatch,
                logoutDispatch: logoutDispatch,
                getLastLoginHN: getLastLoginHN,
                increaseFailedLoginAttempts: increaseFailedLoginAttempts,
                lockedUntil: lockedUntil,
                setLockedUntil: setLockedUntil,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
