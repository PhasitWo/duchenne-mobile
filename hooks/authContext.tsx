import { useContext, createContext, useEffect, type PropsWithChildren, useReducer, useMemo } from "react";
import type { AuthAction, AuthActionEnum, AuthState } from "./authReducer";
import authReducer from "./authReducer";

type LoginData = { hn: string; password: string };
type Login = (data: LoginData) => void;
export type SignupData = {
    hn: string;
    firstName: string;
    middleName: string;
    lastName: string;
    phone: string;
    email: string;
};
type Signup = (data: SignupData) => void;
type Logout = () => void;

const AuthContext = createContext<{ authState: AuthState; login: Login; signup: Signup; logout: Logout }>({
    authState: { isLoading: true, isSignin: false, userToken: null },
    login: (data) => null,
    signup: (data) => null,
    logout: () => null,
});

export function useAuthContext() {
    const val = useContext(AuthContext);
    return val;
}
export function AuthProvider({ children }: PropsWithChildren) {
    const [authState, dispatch] = useReducer(authReducer, initialState);
    const { login, signup, logout } = useMemo<{ login: Login; signup: Signup; logout: Logout }>(
        () => ({
            login: (data) => {},
            signup: (data) => {},
            logout: () => {},
        }),
        []
    );

    const restoreToken = async () => {
        // Restore token from secure store
    };
    useEffect(() => {
        restoreToken();
    }, []);
    return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}

const initialState: AuthState = {
    isLoading: true,
    isSignin: false,
    userToken: null,
};
