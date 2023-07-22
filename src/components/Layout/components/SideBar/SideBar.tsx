import { AiOutlineHome, AiOutlineShoppingCart, AiOutlineSetting } from 'react-icons/ai';
import { BsChatText, BsBoxArrowUpRight, BsClipboardData } from 'react-icons/bs';
import { MdOutlinePets } from 'react-icons/md';
import { CiUser } from 'react-icons/ci';
import classNames from 'classnames/bind';
import styles from './SideBar.module.scss';
import logo from '../../../../assets/images/logo-petshop.jpg';
import { NavLink } from 'react-router-dom';
import routesConfig from '../../../../config/routes';

const cx = classNames.bind(styles);

function SideBar({ isOpen }: { isOpen: boolean }) {
    return (
        <div
            className={cx('wrapper')}
            style={{
                width: isOpen ? '250px' : '0',
                opacity: isOpen ? '1' : '0',
            }}
        >
            <div className={cx('wrapper-logo')}>
                <div className={cx('logo')}>
                    <img src={logo} alt="logo petshop" />
                </div>
                <span>H07</span>
            </div>
            <div className={cx('contents')}>
                <NavLink to={routesConfig.home} className={cx('link-wrapper')}>
                    <div className={cx('container-link')}>
                        <AiOutlineHome size={'2.5rem'} />
                        <span>Trang chủ</span>
                    </div>
                </NavLink>
                <NavLink to={routesConfig.chat} className={cx('link-wrapper')}>
                    <div className={cx('container-link')}>
                        <BsChatText size={'2.5rem'} />
                        <span>Chats</span>
                    </div>
                </NavLink>
                <NavLink to={routesConfig.products} className={cx('link-wrapper')}>
                    <div className={cx('container-link')}>
                        <MdOutlinePets size={'2.5rem'} />
                        <span>Sản phẩm</span>
                    </div>
                </NavLink>
                <NavLink to={''} className={cx('link-wrapper')}>
                    <div className={cx('container-link')}>
                        <CiUser size={'2.5rem'} />
                        <span>Người dùng</span>
                    </div>
                </NavLink>
                <NavLink to={''} className={cx('link-wrapper')}>
                    <div className={cx('container-link')}>
                        <AiOutlineShoppingCart size={'2.5rem'} />
                        <span>Đơn hàng</span>
                    </div>
                </NavLink>
                <NavLink to={''} className={cx('link-wrapper')}>
                    <div className={cx('container-link')}>
                        <BsClipboardData size={'2.5rem'} />
                        <span>Thống kê</span>
                    </div>
                </NavLink>
                <NavLink to={''} className={cx('link-wrapper')}>
                    <div className={cx('container-link')}>
                        <BsBoxArrowUpRight size={'2.5rem'} />
                        <span>Phân tích</span>
                    </div>
                </NavLink>
                <NavLink to={''} className={cx('link-wrapper')}>
                    <div className={cx('container-link')}>
                        <AiOutlineSetting size={'2.5rem'} />
                        <span>Cài đặt</span>
                    </div>
                </NavLink>
            </div>
        </div>
    );
}

export default SideBar;
