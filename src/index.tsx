import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RecoilRoot } from 'recoil';
import { GlobalStyles } from './components/GlobalStyles';
import SessionContextProvider from './contexts/SessionContext';
import { AntContextProvider } from './contexts/AntContexts';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <GlobalStyles>
            <RecoilRoot>
                <SessionContextProvider>
                    <AntContextProvider>
                        <App />
                    </AntContextProvider>
                </SessionContextProvider>
            </RecoilRoot>
        </GlobalStyles>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
