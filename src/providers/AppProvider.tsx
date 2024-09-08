import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { socketContext } from '../contexts/socketContext';

type _AppContext = {
    isConnected: boolean;
};

type _T_Props = {
    children: ReactNode;
};

const defaultValue: _AppContext = {
    isConnected: false,
};

const AppContext = createContext(defaultValue);
export const useAppContext = () => useContext<_AppContext>(AppContext);

const AppProvider = (props: _T_Props) => {
    const [connect, setConnect] = useState(defaultValue.isConnected);

    const context: _AppContext = {
        isConnected: connect,
    };

    useEffect(() => {
        socketContext.on('connect', () => {
            setConnect(true);
        });

        return () => {
            setConnect(false);
            socketContext.off('connect');
        };
    }, []);

    return <AppContext.Provider value={context}>{props.children}</AppContext.Provider>;
};

export default AppProvider;
