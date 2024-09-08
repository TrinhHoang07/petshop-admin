import { IoMdNotificationsOutline } from 'react-icons/io';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
import avatar from '../../../../assets/images/logo-petshop.jpg';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Dropdown, MenuProps, Modal } from 'antd';
import { useAntContext } from '../../../../contexts/AntContexts';
import { useSessionContext } from '../../../../contexts/SessionContext';
import { useNavigate } from 'react-router-dom';
import routesConfig from '../../../../config/routes';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Header({ setIsOpen, isOpen }: { setIsOpen: Function; isOpen: boolean }) {
    const message = useAntContext();
    const [, setStateContext] = useSessionContext();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const onClick: MenuProps['onClick'] = ({ key }) => {
        if (key === 'logout') {
            message?.modal.confirm({
                title: 'Đăng xuất?',
                content: 'Bạn có chắc chắn muốn đăng xuất không?',
                onOk: () => {
                    localStorage.removeItem('admin');
                    setStateContext({
                        isAuth: false,
                        admin: {},
                    });

                    navigate(routesConfig.login);

                    message?.message.info('Đăng xuất thành công!').then();
                },
                okText: 'Đồng ý',
                cancelText: 'Hủy',
            });
        }
    };

    const items: MenuProps['items'] = [
        {
            label: 'Đăng xuất',
            key: 'logout',
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <Modal
                open={open}
                title={<h3 style={{ textAlign: 'center' }}>Tất cả thông báo</h3>}
                width={'50%'}
                onCancel={() => setOpen(false)}
                footer={<></>}
                forceRender
            >
                <div>
                    <p>
                        <strong>Bạn chưa có thông báo nào!</strong>
                    </p>
                </div>
            </Modal>
            <div onClick={() => setIsOpen((prev: boolean) => !prev)} className={cx('close-sidebar')}>
                {isOpen ? <AiOutlineMenuFold size={'2.5rem'} /> : <AiOutlineMenuUnfold size={'2.5rem'} />}
            </div>
            <div className={cx('utils')}>
                <div onClick={() => setOpen(true)} className={cx('item')}>
                    <IoMdNotificationsOutline size={'2.5rem'} />
                    <div className={cx('count-noti')}>
                        <span>5</span>
                    </div>
                </div>
                <Dropdown trigger={['click']} menu={{ items, onClick }}>
                    <div className={cx('item')}>
                        <div className={cx('avatar')}>
                            <img src={avatar} alt="avatar admin" />
                        </div>
                    </div>
                </Dropdown>
            </div>
        </div>
    );
}

export default Header;
