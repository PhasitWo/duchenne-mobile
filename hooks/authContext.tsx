import { useContext, createContext, useEffect, type PropsWithChildren, useReducer, useMemo } from "react";
import { AuthAction, AuthActionEnum, AuthState } from "./authReducer";
import authReducer from "./authReducer";
import * as SecureStore from "expo-secure-store";

type LoginData = { hn: string; password: string };
type Login = (data: LoginData) => void;
type Logout = () => void;
enum SecureStoreKey {
    USER_TOKEN = "userToken",
}

const AuthContext = createContext<{ authState: AuthState; login: Login; logout: Logout }>({
    authState: { isLoading: true, isSignin: false, userToken: null },
    login: (data) => null,
    logout: () => null,
});

export function useAuthContext() {
    const val = useContext(AuthContext);
    return val;
}
export function AuthProvider({ children }: PropsWithChildren) {
    const [authState, dispatch] = useReducer(authReducer, initialState);
    const { login, logout } = useMemo<{ login: Login; logout: Logout }>(
        () => ({
            login: async (data) => {
                //TODO POST TO SERVER
                await SecureStore.setItemAsync(SecureStoreKey.USER_TOKEN, "dummy-token");
                dispatch({ type: AuthActionEnum.LOGIN, userToken: "dummy-token" });
            },
            logout: async () => {
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
    };
    useEffect(() => {
        restoreToken();
    }, []);
    return <AuthContext.Provider value={{ authState: authState, login: login, logout: logout }}>{children}</AuthContext.Provider>;
}

const initialState: AuthState = {
    isLoading: true,
    isSignin: false,
    userToken: null,
};
