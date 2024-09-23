import { IoMdNotificationsOutline } from 'react-icons/io';
import { GoDotFill } from 'react-icons/go';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
import avatar from '../../../../assets/images/logo.png';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Dropdown, MenuProps, Modal } from 'antd';
import { useAntContext } from '../../../../contexts/AntContexts';
import { useSessionContext } from '../../../../contexts/SessionContext';
import { useNavigate } from 'react-router-dom';
import routesConfig from '../../../../config/routes';
import { useEffect, useState } from 'react';
import { ApiService } from '../../../../axios/ApiService';

const cx = classNames.bind(styles);

function Header({ setIsOpen, isOpen }: { setIsOpen: Function; isOpen: boolean }) {
    const message = useAntContext();
    const [, setStateContext] = useSessionContext();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const apiService = new ApiService();
    const [notifications, setNotifications] = useState<any[]>([]);

    useEffect(() => {
        apiService.notis
            .getNotis()
            .then((res) => {
                if (res.message === 'success') {
                    setNotifications(res.data);
                }
            })
            .catch((err) => console.error(err));
    }, []);

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

    const handleSeen = (id: number) => {
        apiService.notis
            .updateSeen(id.toString())
            .then((res: any) => {
                if (res.message === 'success') {
                    setNotifications((item) => {
                        const data = [...item];
                        const itemId = data.findIndex((item) => item.id === id);
                        if (itemId !== -1) {
                            data[itemId] = {
                                ...data[itemId],
                                seen: true,
                            };

                            return data;
                        } else {
                            return data;
                        }
                    });
                }
            })
            .catch((err) => console.error(err));
    };

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
                <div className={cx('content-notificationszz')}>
                    {notifications.length > 0 ? (
                        notifications.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => handleSeen(item.id)}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                                className={cx('content-notificationsz')}
                            >
                                <p>{item.seen ? item.content : <strong>{item.content}</strong>}</p>
                                {!item.seen && (
                                    <GoDotFill
                                        style={{
                                            color: 'blue',
                                        }}
                                    />
                                )}
                            </div>
                        ))
                    ) : (
                        <p>Chưa có thông báo nào!</p>
                    )}
                </div>
            </Modal>
            <div onClick={() => setIsOpen((prev: boolean) => !prev)} className={cx('close-sidebar')}>
                {isOpen ? <AiOutlineMenuFold size={'2.5rem'} /> : <AiOutlineMenuUnfold size={'2.5rem'} />}
            </div>
            <div className={cx('utils')}>
                <div onClick={() => setOpen(true)} className={cx('item')}>
                    <IoMdNotificationsOutline size={'2.5rem'} />
                    <div className={cx('count-noti')}>
                        <span>
                            {notifications.filter((item) => !item.seen).length > 0
                                ? notifications.filter((item) => !item.seen).length
                                : ''}
                        </span>
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
