import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Customers.module.scss';
import { Button, Form, Table } from 'antd';
import { useAntContext } from '../../contexts/AntContexts';
import { Customers } from '../../models/Products';
import { ApiService } from '../../axios/ApiService';
import { Loading } from '../../components/Loading';
import { FaCat } from 'react-icons/fa';
import ModalAddCustomer from './ModalAddCustomer';

export type TFormAdd = {
    name: string;
    password: string;
    email: string;
    address?: string;
    gender?: string;
    phone_number?: string;
    avatar_path?: string;
    birth_date?: string;
};

const cx = classNames.bind(styles);

function CustomersScreen() {
    const message = useAntContext();
    const [dataSource, setDataSource] = useState<Customers[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isModalAdd, setIsModalAdd] = useState<boolean>(false);
    const [form] = Form.useForm<TFormAdd>();
    const apiService = new ApiService();

    useEffect(() => {
        apiService.customers
            .getCustomers()
            .then((res) => {
                if (res.data) {
                    setDataSource(
                        res.data.map((item: any) => ({
                            key: item.id,
                            id: item.id,
                            name: item.name,
                            gender: item.gender,
                            email: item.email,
                            address: item.address,
                            phoneNumber: item.phone_number,
                            birthDate: item.birth_date,
                            avatarPath: item.avatar_path,
                        })),
                    );
                }
            })
            .catch((err) => console.log(err));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dataSource.length > 0 && setIsLoading(false);
    }, [dataSource]);

    const columns = useMemo(
        () => [
            {
                title: 'STT',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: 'Address',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: 'Phone Number',
                dataIndex: 'phoneNumber',
                key: 'phoneNumber',
            },
            {
                title: 'Gender',
                dataIndex: 'gender',
                key: 'gender',
            },
            {
                title: 'Actions',
                key: 'actions',
                render: (item: Customers) => (
                    <Button
                        onClick={() => {
                            message?.modal.confirm({
                                title: 'Thông báo',
                                content: 'Bạn có chắc chắn muốn xóa không?',
                                okText: 'Xóa',
                                cancelText: 'Hủy',
                                onOk: () => {
                                    console.log('id delete: ', item);
                                    console.log('data source: ', dataSource);

                                    apiService.customers
                                        .deleteCustomer(item.id.toString())
                                        .then((res) => {
                                            if (res.message === 'success') {
                                                message.message.success('Xóa thành công!').then();
                                                setDataSource((prev) => prev.filter((data) => data.id !== item.id));
                                            }
                                        })
                                        .catch((err) => console.log(err));
                                },
                            });
                        }}
                        style={{ marginLeft: '8px' }}
                        type="default"
                    >
                        Xóa
                    </Button>
                ),
            },
        ],

        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    return (
        <div className={cx('customers')}>
            <div className={cx('header')}>
                <div className={cx('list-options')}>
                    <div className={cx('item-option')}>
                        <span>
                            <FaCat size={'2rem'} />
                        </span>
                        <p>Tìm kiếm</p>
                    </div>
                </div>
                <div className={cx('actions')}>
                    <Button
                        onClick={() => setIsModalAdd(true)}
                        className={cx('add-products')}
                        type="primary"
                        size="large"
                    >
                        Thêm Người Dùng
                    </Button>
                    <ModalAddCustomer
                        form={form}
                        open={isModalAdd}
                        setOpen={setIsModalAdd}
                        setDataSource={setDataSource}
                    />
                </div>
            </div>
            <div className={cx('wrapper')}>
                {isLoading ? (
                    <div className={cx('wrapper-loading')}>
                        <Loading />
                    </div>
                ) : (
                    <Table columns={columns} dataSource={dataSource} />
                )}
            </div>
        </div>
    );
}

export default CustomersScreen;
