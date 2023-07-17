import styles from './Typing.module.scss';
import classNames from 'classnames/bind';
import logo from '../../../../assets/images/logo-petshop.jpg';

const cx = classNames.bind(styles);

function Typing() {
    return (
        <div className={cx('typing-container')}>
            <div className={cx('wrap-img')}>
                <img src={logo} alt="logo shop" />
            </div>
            <div className={cx('container')}>
                <div className={cx('circle', 'circle-1')}></div>
                <div className={cx('circle', 'circle-2')}></div>
                <div className={cx('circle', 'circle-3')}></div>
            </div>
        </div>
    );
}

export default Typing;
