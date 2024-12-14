import { useContext, createContext, useEffect, type PropsWithChildren, useReducer, useMemo } from "react";
import { AuthActionEnum, AuthState } from "./authReducer";
import authReducer from "./authReducer";
import * as SecureStore from "expo-secure-store";
import { SecureStoreKey } from "@/constants/SecureStorageKey";
import useTutorial from "./useTutorial";

type LoginDispatch = (userToken: string) => Promise<void>;
type LogoutDispatch = () => void;

const initialState: AuthState = {
    isLoading: true,
    isSignin: false,
    userToken: null,
};

const AuthContext = createContext<{ authState: AuthState; loginDispatch: LoginDispatch; logoutDispatch: LogoutDispatch }>({
    authState: { isLoading: true, isSignin: false, userToken: null },
    loginDispatch: async (data) => {},
    logoutDispatch: () => null,
});

export function useAuthContext() {
    const val = useContext(AuthContext);
    return val;
}
export function AuthProvider({ children }: PropsWithChildren) {
    const [authState, dispatch] = useReducer(authReducer, initialState);
    const {setShowAppointmentTutorial, setShowAskTutorial} = useTutorial()
    const { loginDispatch, logoutDispatch } = useMemo<{ loginDispatch: LoginDispatch; logoutDispatch: LogoutDispatch }>(
        () => ({
            loginDispatch: async (userToken) => {
                await SecureStore.setItemAsync(SecureStoreKey.USER_TOKEN, userToken);
                setShowAppointmentTutorial(true);
                setShowAskTutorial(true);
                dispatch({ type: AuthActionEnum.LOGIN, userToken: userToken });
            },
            logoutDispatch: async () => {
                await SecureStore.deleteItemAsync(SecureStoreKey.USER_TOKEN);
                dispatch({ type: AuthActionEnum.LOGOUT });
            },
        }),
        []
    );

    const restoreToken = async () => {
        console.log("start restoring token");
        const result = await SecureStore.getItemAsync(SecureStoreKey.USER_TOKEN);
        console.log("restore => " + result);
        dispatch({ type: AuthActionEnum.RESTORE, userToken: result });
        console.log("restoring end");
        console.log(process.env.EXPO_PUBLIC_API_URL);
    };
    useEffect(() => {
        restoreToken();
    }, []);

    return (
        <AuthContext.Provider value={{ authState: authState, loginDispatch: loginDispatch, logoutDispatch: logoutDispatch }}>
            {children}
        </AuthContext.Provider>
    );
}
