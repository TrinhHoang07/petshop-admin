import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

type TProps = {
    children: ReactNode;
};

type TAdmin = {
    name?: string;
    email?: string;
    phone?: string;
    token?: string;
};

type TState = {
    isAuth: boolean;
    admin?: TAdmin;
};

const initState: TState = {
    isAuth: false,
};

const ContextSession = createContext<[TState, (session: TState) => void]>([initState, () => {}]);
const useSessionContext = () => useContext(ContextSession);

function SessionContextProvider(props: TProps) {
    const [stateContext, setStateContext] = useState<TState>(initState);
    const values: [TState, typeof setStateContext] = [stateContext, setStateContext];

    useEffect(() => {
        const user: any = localStorage.getItem('admin');
        if (user) {
            const data = JSON.parse(user);
            if (data) {
                initState.isAuth = true;
                initState.admin = {
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    token: data.token,
                };
            }
        }
    }, []);

    return <ContextSession.Provider value={values}>{props.children}</ContextSession.Provider>;
}

export default SessionContextProvider;
export { useSessionContext };
