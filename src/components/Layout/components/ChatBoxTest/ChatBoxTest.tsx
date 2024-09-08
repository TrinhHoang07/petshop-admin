import styles from './ChatBoxTest.module.scss';
import classNames from 'classnames/bind';
import { BiMinus, BiHappy } from 'react-icons/bi';
import { IoSend } from 'react-icons/io5';
import { BsFillImageFill } from 'react-icons/bs';
import logo from '../../../../assets/images/logo-petshop.jpg';
import cat from '../../../../assets/images/meoww.jpg';
import { useEffect, useRef, useState, SetStateAction, Dispatch, useMemo } from 'react';
import { Typing } from '../Typing';
import { Helper } from '../../../../helper';
import { socketContext } from '../../../../contexts/socketContext';

const cx = classNames.bind(styles);
type TMes = {
    role: string;
    message: string;
    id?: string;
    name: string;
};

type _T_Props = {
    idUser: string;
    setIdUser: (value: string) => void;
    messages: TMes[];
    setMessages: Dispatch<SetStateAction<TMes[]>>;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
};

///////// CHƯA FORCUS VÀO INPUT KHI CHUYỂN SANG USER KHÁC => CHƯA FIX

function ChatBox(props: _T_Props) {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');
    const mesRef = useRef<HTMLDivElement>(null);
    const nameCurrent = useRef<string>('');
    const inputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef1 = useRef<HTMLDivElement>(null);

    // scroll to message latest
    useEffect(() => {
        scrollToBottom();
        inputRef.current?.focus();
    }, [props.open, props.messages]);

    useEffect(() => {
        if (value.trim().length > 0) {
            socketContext.emit('typing_admin', nameCurrent.current);
        } else {
            socketContext.emit('clear_typing_admin', nameCurrent.current);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    useEffect(() => {
        nameCurrent.current = props.idUser;
    }, [props.idUser]);

    const renderMessages = useMemo(() => {
        return props.messages.filter((item) => item.id === props.idUser);
    }, [props.idUser, props.messages]);

    useEffect(() => {
        socketContext.on(`typing_user_${nameCurrent.current}`, (data: any) => {
            if (nameCurrent.current === data.isType) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        });

        socketContext.on(`clear_typing_user_${nameCurrent.current}`, (data: any) => {
            if (data.isType === nameCurrent.current) {
                setIsVisible(false);
            }
        });

        return () => {
            socketContext.off(`typing_user_${nameCurrent.current}`);
            socketContext.off(`clear_typing_user_${nameCurrent.current}`);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nameCurrent.current]);

    const scrollToBottom = () => {
        messagesEndRef1.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSubmit = () => {
        if (value.trim().length > 0) {
            socketContext.emit('messageToUser', {
                id: props.idUser,
                name: 'Van Hoang',
                message: value,
                role: 'admin',
            });
            props.setMessages((prev) => [
                ...prev,
                { message: value, name: 'Van Hoang', role: 'admin', id: props.idUser },
            ]);
            Helper.handleCreateOrSaveMessage({ message: value, name: 'Van Hoang', role: 'admin', id: props.idUser });
            setValue('');
            inputRef.current && inputRef.current.focus();
        }
    };

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className={cx('chat-box')}>
            {props.open && (
                <div className={cx('content')}>
                    <div className={cx('header-chat')}>
                        <div className={cx('info-header')}>
                            <div className={cx('wrap-img')}>
                                <img src={logo} alt="logo shop" />
                            </div>
                            <h3 className={cx('heading')}>Chat với {renderMessages[0].name ?? 'Unknown'}</h3>
                        </div>
                        <div onClick={() => props.setOpen(false)} className={cx('close-btn')}>
                            <BiMinus color="#ffffff" size={'2.5rem'} />
                        </div>
                    </div>
                    <div ref={mesRef} className={cx('messages')}>
                        {renderMessages.map((message, index) => {
                            if (message.role === 'user') {
                                return (
                                    <div key={index} className={cx('message', 'getview')}>
                                        <div className={cx('avatar')}>
                                            <img src={logo} alt="shop-admin" />
                                        </div>
                                        <p className={cx('content-message')}>{message.message}</p>
                                    </div>
                                );
                            } else {
                                return (
                                    <div key={index} className={cx('message-2', 'getview')}>
                                        <div className={cx('avatar-2')}>
                                            <img src={cat} alt="shop-admin" />
                                        </div>
                                        <p className={cx('content-message-2')}>{message.message}</p>
                                    </div>
                                );
                            }
                        })}
                        <div ref={messagesEndRef1} />
                    </div>
                    <div className={cx('footer-chat')}>
                        {isVisible && <Typing />}
                        <div className={cx('footer-content')}>
                            <div className={cx('input-footer')}>
                                <span className={cx('icons')}>
                                    <BsFillImageFill />
                                </span>
                                <span className={cx('icons', 'mr-6')}>
                                    <BiHappy />
                                </span>
                                <input
                                    onKeyUp={handleEnter}
                                    ref={inputRef}
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    type="text"
                                    placeholder="Aa..."
                                />
                            </div>
                            <div onClick={handleSubmit} className={cx('btn-submit')}>
                                <IoSend />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChatBox;
