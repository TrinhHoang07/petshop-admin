import classNames from 'classnames/bind';
import styles from './Chat.module.scss';
import img from '../../assets/images/unknown-user.jpg';
import { TMes } from './Chat';
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const cx = classNames.bind(styles);

type T_Props = {
    item: TMes;
    seen: string[];
};

function ChatItem(props: T_Props) {
    console.log('itemsssss: ', props.item.id);

    const socketRef = useRef<Socket>();
    const [test, setTest] = useState<any>({});

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
                socketRef.current?.on(`${props.item.id}`, (data) => {
                    setTest((prev: any) => {
                        return {
                            ...prev,
                            [`${props.item.id}`]: data,
                        };
                    });
                });

                socketRef.current?.on('user_sent', (data) => {
                    setTest((prev: any) => {
                        return {
                            ...prev,
                            [`${data.id}`]: data,
                        };
                    });
                });
            });

            socketRef.current.on('disconnect', () => {
                console.log('id disconnected: ', socketRef.current?.id);
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socketRef.current]);

    return (
        <div className={cx('chat-item')}>
            <div className={cx('avatar')}>
                <img src={img} alt="unknown user" />
                {props.seen.includes(props.item.id ?? '') && (
                    <div className={cx('seen-message')}>
                        <span>1</span>
                    </div>
                )}
            </div>
            <div className={cx('info-user')}>
                <p className={cx('name-unknown')}>{props.item.name ?? 'Unknown'}</p>
                <p className={cx('noti-mes')}>
                    {/* {dataLastMessage.current
                        ? dataLastMessage.current[`${props.item.id}`] === 'admin'
                            ? 'Bạn: ' + lastMessage.message
                            : lastMessage.message
                        : props.item.message} */}
                    {Object.keys(test).length && test[`${props.item.id}`]
                        ? test[`${props.item.id}`].role === 'admin'
                            ? 'Bạn: ' + test[`${props.item.id}`].message
                            : test[`${props.item.id}`].message
                        : props.item.message}
                </p>
            </div>
        </div>
    );
}

export default ChatItem;
