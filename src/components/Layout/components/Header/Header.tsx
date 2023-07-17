import { IoMdNotificationsOutline } from 'react-icons/io';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
import avatar from '../../../../assets/images/logo-petshop.jpg';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header({ setIsOpen, isOpen }: { setIsOpen: Function; isOpen: boolean }) {
    return (
        <div className={cx('wrapper')}>
            <div onClick={() => setIsOpen((prev: boolean) => !prev)} className={cx('close-sidebar')}>
                {isOpen ? <AiOutlineMenuFold size={'2.5rem'} /> : <AiOutlineMenuUnfold size={'2.5rem'} />}
            </div>
            <div className={cx('utils')}>
                <div className={cx('item')}>
                    <IoMdNotificationsOutline size={'2.5rem'} />
                    <div className={cx('count-noti')}>
                        <span>5</span>
                    </div>
                </div>
                <div className={cx('item')}>
                    <IoMdNotificationsOutline size={'2.5rem'} />
                    <div className={cx('count-noti')}>
                        <span>5</span>
                    </div>
                </div>
                <div className={cx('item')}>
                    <IoMdNotificationsOutline size={'2.5rem'} />
                    <div className={cx('count-noti')}>
                        <span>5</span>
                    </div>
                </div>
                <div className={cx('item')}>
                    <div className={cx('avatar')}>
                        <img src={avatar} alt="avatar admin" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
