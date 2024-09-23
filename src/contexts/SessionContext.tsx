import { ReactNode, createContext, useContext, useState } from 'react';

type TProps = {
    children: ReactNode;
};

type TAdmin = {
    name?: string;
    email?: string;
    phone?: string;
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

    return <ContextSession.Provider value={values}>{props.children}</ContextSession.Provider>;
}

export default SessionContextProvider;
export { useSessionContext };
