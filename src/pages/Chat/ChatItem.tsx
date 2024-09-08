import classNames from 'classnames/bind';
import styles from './Chat.module.scss';
import img from '../../assets/images/unknown-user.jpg';
import { TMes } from './Chat';
import { useState } from 'react';

const cx = classNames.bind(styles);

type T_Props = {
    item: TMes;
    seen: string[];
};

function ChatItem(props: T_Props) {
    const [idChats, setIdChats] = useState<any>({});

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
                    {Object.keys(idChats).length && idChats[`${props.item.id}`]
                        ? idChats[`${props.item.id}`].role === 'admin'
                            ? 'Bạn: ' + idChats[`${props.item.id}`].message
                            : idChats[`${props.item.id}`].message
                        : props.item.message}
                </p>
            </div>
        </div>
    );
}

export default ChatItem;
