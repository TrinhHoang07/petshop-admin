import classNames from 'classnames/bind';
import styles from './Chat.module.scss';
import { useState, useEffect, useMemo } from 'react';
import { ChatBoxTest } from '../../components/Layout/components/ChatBoxTest';
import ChatItem from './ChatItem';
import { AiOutlineSearch } from 'react-icons/ai';
import { Helper } from '../../helper';
import { socketContext } from '../../contexts/socketContext';
import { useAppContext } from '../../providers/AppProvider';

const cx = classNames.bind(styles);

export type TMes = {
    role: string;
    message: string;
    id?: string;
    name: string;
};

///////// CHƯA FORCUS VÀO INPUT KHI CHUYỂN SANG USER KHÁC => CHƯA FIX

function Chat(): JSX.Element {
    const [messages, setMessages] = useState<TMes[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [seen, setSeen] = useState<string[]>([]);
    const [idUser, setIdUser] = useState<string>('');
    const [isUser, setIsUser] = useState<boolean>(true);
    const { isConnected } = useAppContext();

    const renderUser = useMemo(() => {
        if (messages.length > 0 && messages[messages.length - 1].role === 'admin') {
            setIsUser(false);
        } else {
            setIsUser(true);
        }

        return messages
            .filter((item) => item.role === 'user')
            .filter((v: TMes, i, a: TMes[]) => a.findLastIndex((v2: TMes) => v2.id === v.id) === i)
            .reverse();
    }, [messages]);

    useEffect(() => {
        const data = sessionStorage.getItem('messages-admin');

        if (data) {
            const values = JSON.parse(data) as TMes[];

            if (values.length > 0) {
                setMessages(values);
            }
        }
    }, []);

    useEffect(() => {
        if (isUser && !open) {
            const idNew = renderUser[0]?.id;

            if (idNew) {
                setSeen((prev) => {
                    if (prev.indexOf(idNew) !== -1) {
                        return [...prev];
                    } else {
                        return [...prev, idNew];
                    }
                });
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [renderUser]);

    useEffect(() => {
        socketContext.on('user_sent', (data) => {
            setMessages((prev) => [
                ...prev,
                {
                    message: data.message,
                    name: data.name,
                    role: data.role,
                    id: data.id,
                },
            ]);
            Helper.handleCreateOrSaveMessage({
                message: data.message,
                name: data.name,
                role: data.role,
                id: data.id,
            });
        });

        return () => {
            socketContext.off('user_sent');
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isConnected]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header-chat')}>
                <h3 className={cx('heading-chat')}>Chats</h3>
                <div className={cx('searching')}>
                    <AiOutlineSearch size={'2.2rem'} />
                    <input type="text" placeholder="Tìm kiếm..." />
                </div>
            </div>
            <div>
                {renderUser
                    .reverse()
                    // .filter((item) => item.role === 'user')
                    .map((item: TMes) => {
                        return (
                            <div
                                onClick={() => {
                                    setIdUser(item.id ?? '');
                                    setOpen(true);
                                    setSeen((prev) => prev.filter((iii) => iii !== item.id));
                                }}
                                key={item.id}
                            >
                                <ChatItem item={item} seen={seen} />
                            </div>
                        );
                    })}
                <ChatBoxTest
                    idUser={idUser}
                    setIdUser={setIdUser}
                    open={open}
                    setOpen={setOpen}
                    messages={messages}
                    setMessages={setMessages}
                />
            </div>
        </div>
    );
}

export default Chat;
