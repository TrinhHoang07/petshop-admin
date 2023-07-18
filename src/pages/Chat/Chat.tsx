import classNames from 'classnames/bind';
import styles from './Chat.module.scss';

import { useRef, useState, useEffect, useMemo } from 'react';
import { Socket, io } from 'socket.io-client';
import { ChatBoxTest } from '../../components/Layout/components/ChatBoxTest';
import ChatItem from './ChatItem';
import { AiOutlineSearch } from 'react-icons/ai';
// import { ChatBoxTest } from '../../components/Layout/components/ChatBoxTest';

const cx = classNames.bind(styles);

type TMes = {
    role: string;
    message: string;
    id?: string;
    name: string;
};

function Chat(): JSX.Element {
    // test chats
    const socketRef = useRef<Socket>();
    const [messages, setMessages] = useState<TMes[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [idUser, setIdUser] = useState<string>('');

    const renderUser = useMemo(() => {
        return messages.filter((v: TMes, i, a: any[]) => a.findLastIndex((v2: TMes) => v2.id === v.id) === i);
    }, [messages]);

    useEffect(() => {
        const socket = io('http://localhost:3008', {
            timeout: 5000,
        });

        socketRef.current = socket;

        return () => {
            socketRef.current?.disconnect();
        };
    }, []);

    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on('connect', () => {
                console.log('id connected ADMIN: ', socketRef.current?.id);

                socketRef.current?.on('user_sent', (data) => {
                    setMessages((prev) => [
                        ...prev,
                        {
                            message: data.message,
                            name: data.name,
                            role: data.role,
                            id: data.id,
                        },
                    ]);
                });
            });

            socketRef.current.on('disconnect', () => {
                console.log('id disconnected: ', socketRef.current?.id);
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socketRef.current]);

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
                {renderUser.reverse().map((item: any) => {
                    return (
                        <div
                            onClick={() => {
                                setIdUser(() => item.id as string);
                                setOpen(true);
                            }}
                            key={item.id}
                        >
                            <ChatItem item={item} />
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
                    socketRef={socketRef}
                />
            </div>
        </div>
    );
}

export default Chat;
