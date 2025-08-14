import { useContext, createContext, useEffect, type PropsWithChildren, useReducer, useMemo } from "react";
import authReducer, { AuthActionEnum, AuthState } from "./authReducer";
import * as SecureStore from "expo-secure-store";
import { SecureStoreKey } from "@/constants/SecureStorageKey";
import useTutorial from "./useTutorial";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKey } from "@/constants/AsyncStorageKey";

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
}>({
    authState: { isLoading: true, userToken: null },
    loginDispatch: async () => {},
    logoutDispatch: () => null,
    getLastLoginHN: async () => "",
});

export function useAuthContext() {
    const val = useContext(AuthContext);
    return val;
}
export function AuthProvider({ children }: PropsWithChildren) {
    const [authState, dispatch] = useReducer(authReducer, initialState);
    const { setShowAppointmentTutorial, setShowAskTutorial } = useTutorial();
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

    const restoreToken = async () => {
        let result = null;
        try {
            console.log("start restoring token");
            result = await SecureStore.getItemAsync(SecureStoreKey.USER_TOKEN);
            console.log("restore => " + result);
        } catch (err) {
            alert(`Error restoring token: ${err}`);
        } finally {
            dispatch({ type: AuthActionEnum.RESTORE, userToken: result });
        }
    };
    useEffect(() => {
        restoreToken();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                authState: authState,
                loginDispatch: loginDispatch,
                logoutDispatch: logoutDispatch,
                getLastLoginHN: getLastLoginHN,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
