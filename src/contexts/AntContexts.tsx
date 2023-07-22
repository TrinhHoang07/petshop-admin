import React, { createContext, useContext } from 'react';
import { message as _message, Modal, notification as _notification } from 'antd';
import type { NotificationInstance } from 'antd/es/notification/interface';
import type { MessageInstance } from 'antd/es/message/interface';
import type { ModalStaticFunctions } from 'antd/es/modal/confirm';

type _T_Value = {
    modal: Omit<ModalStaticFunctions, 'warn'>;
    notification: NotificationInstance;
    message: MessageInstance;
};

export const AntContext = createContext<_T_Value | undefined>(undefined);

export const useAntContext = () => useContext(AntContext);

export const AntContextProvider: React.FC<{
    children: React.ReactNode;
}> = (props) => {
    const [modal, contextModal] = Modal.useModal();
    const [notification, contextNotification] = _notification.useNotification();
    const [message, contextMessage] = _message.useMessage();

    const defaultAntContext: _T_Value = {
        modal: modal,
        notification: notification,
        message: message,
    };

    return (
        <AntContext.Provider value={defaultAntContext}>
            <>
                {contextModal}
                {contextNotification}
                {contextMessage}
            </>
            {props.children}
        </AntContext.Provider>
    );
};
