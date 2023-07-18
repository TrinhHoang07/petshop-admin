import classNames from 'classnames/bind';
import styles from './Chat.module.scss';
import img from '../../assets/images/unknown-user.jpg';

const cx = classNames.bind(styles);

function ChatItem({ item }: { item: any }) {
    return (
        <div className={cx('chat-item')}>
            <div className={cx('avatar')}>
                <img src={img} alt="unknown user" />
            </div>
            <div className={cx('info-user')}>
                <p className={cx('name-unknown')}>{item.name ?? 'Unknown'}</p>
                <p className={cx('noti-mes')}>{item.message}</p>
            </div>
        </div>
    );
}

export default ChatItem;
