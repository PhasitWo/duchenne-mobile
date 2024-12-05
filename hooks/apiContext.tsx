import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import type { AxiosInstance } from "axios";
import axios from "axios";
import { useAuthContext } from "./authContext";

const ApiContext = createContext<{ api: AxiosInstance; apiNoAuth: AxiosInstance }>({
    api: axios.create(),
    apiNoAuth: axios.create(),
});

export function useApiContext() {
    const val = useContext(ApiContext);
    return val;
}
export function ApiProvider({ children }: PropsWithChildren) {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const { authState } = useAuthContext();
    const { api, apiNoAuth } = useMemo<{ api: AxiosInstance; apiNoAuth: AxiosInstance }>(
        () => ({
            api: axios.create({
                baseURL: apiUrl,
                headers: { Authorization: authState.userToken },
                timeout: 5000,
                validateStatus: (status) => {
                    return status < 500 && status != 400 && status != 404;
                },
            }),
            apiNoAuth: axios.create({
                baseURL: apiUrl,
                timeout: 5000,
                validateStatus: (status) => {
                    return status < 500 && status != 400 && status != 404;
                },
            }),
        }),
        [authState.userToken]
    );
    return <ApiContext.Provider value={{ api: api, apiNoAuth: apiNoAuth }}>{children}</ApiContext.Provider>;
}
