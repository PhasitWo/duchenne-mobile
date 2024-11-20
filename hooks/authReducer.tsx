import { type ReducerAction } from "react";

export enum AuthActionEnum {
    RESTORE = "RESTORE_TOKEN",
    LOGIN = "LOGIN",
    SIGNUP = "SIGNUP",
    LOGOUT = "LOGOUT",
}

export type AuthAction = {
    type: AuthActionEnum;
};

export type AuthState = {
    isLoading: boolean;
    isSignin: boolean;
    userToken: string | null;
};

export default function authReducer(prevState: AuthState, action: AuthAction) : AuthState {
    switch (action.type) {
        case AuthActionEnum.LOGIN:
            return {
                ...prevState,
            };
        case AuthActionEnum.SIGNUP:
            return {
                ...prevState,
            };
        case AuthActionEnum.LOGOUT:
            return {
                ...prevState,
            };
        default:
            throw new Error("invalid action type")
    }
}
