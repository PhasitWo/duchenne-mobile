export enum AuthActionEnum {
    RESTORE = "RESTORE_TOKEN",
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
}

export type AuthAction = {
    type: AuthActionEnum;
    userToken?: string | null;
};

export type AuthState = {
    isLoading: boolean;
    isSignin: boolean;
    userToken: string | null;
};

export default function authReducer(prevState: AuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case AuthActionEnum.RESTORE:
            return {
                ...prevState,
                isLoading: false,
                isSignin: true,
                userToken: action.userToken as string | null,
            };
        case AuthActionEnum.LOGIN:
            return {
                ...prevState,
                isSignin: true,
                userToken: action.userToken as string,
            };
        case AuthActionEnum.LOGOUT:
            return {
                ...prevState,
                isSignin: false,
                userToken: null,
            };
        default:
            throw new Error("invalid action type");
    }
}
