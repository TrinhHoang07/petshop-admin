import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Orders.module.scss';
import { ApiService } from '../../axios/ApiService';
import { Orders as IOrders } from '../../models/Orders';
import { Button, Modal, Select, Table } from 'antd';
import { Loading } from '../../components/Loading';
import { useAntContext } from '../../contexts/AntContexts';
import { Helper } from '../../helper';
import { useAppContext } from '../../providers/AppProvider';
import { socketContext } from '../../contexts/socketContext';
import { AiOutlineSearch } from 'react-icons/ai';

const cx = classNames.bind(styles);

interface _IDataOrders extends IOrders {
    key: number;
}

function Orders() {
    const [data, setData] = useState<IOrders[]>([]);
    const [dataSource, setDataSource] = useState<_IDataOrders[]>([]);
    const [status, setStatus] = useState<{
        status: string;
        id: number;
    }>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const message = useAntContext();
    const apiService = new ApiService();
    const { isConnected } = useAppContext();

    useEffect(() => {
        socketContext.on('user_sent', (data) => {
            Helper.handleCreateOrSaveMessage({
                message: data.message,
                name: data.name,
                role: data.role,
                id: data.id,
            });
        });

        return () => {
            socketContext.off('user_sent');
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isConnected]);

    useEffect(() => {
        apiService.orders
            .getOrders()
            .then((res) => {
                if (res.message === 'success') {
                    setData(res.data as IOrders[]);
                }
            })
            .catch((err) => console.error(err));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            setIsLoading(false);

            setDataSource(() => {
                return data.map((item: IOrders) => {
                    return {
                        key: item.orders_id,
                        customer_address: item.customer_address,
                        customer_avatar_path: item.customer_avatar_path,
                        customer_birth_date: item.customer_birth_date,
                        customer_gender: item.customer_gender,
                        customer_name: item.customer_name,
                        customer_phone_number: item.customer_phone_number,
                        orders_created_at: item.orders_created_at,
                        orders_customer_id: item.orders_customer_id,
                        orders_id: item.orders_id,
                        orders_price: item.orders_price,
                        orders_product_id: item.orders_product_id,
                        orders_quantity: item.orders_quantity,
                        orders_status: item.orders_status,
                        product_color: item.product_color,
                        product_description: item.product_description,
                        product_name: item.product_name,
                        product_preview_url: item.product_preview_url,
                        product_price: item.product_price,
                        product_rate: item.product_rate,
                        product_type: item.product_type,
                    };
                });
            });
        }
    }, [data]);

    useEffect(() => {
        if (search.trim().length > 0) {
            setDataSource(
                data
                    .filter((item) => item.product_name.includes(search.trim()))
                    .map((item: IOrders) => {
                        return {
                            key: item.orders_id,
                            customer_address: item.customer_address,
                            customer_avatar_path: item.customer_avatar_path,
                            customer_birth_date: item.customer_birth_date,
                            customer_gender: item.customer_gender,
                            customer_name: item.customer_name,
                            customer_phone_number: item.customer_phone_number,
                            orders_created_at: item.orders_created_at,
                            orders_customer_id: item.orders_customer_id,
                            orders_id: item.orders_id,
                            orders_price: item.orders_price,
                            orders_product_id: item.orders_product_id,
                            orders_quantity: item.orders_quantity,
                            orders_status: item.orders_status,
                            product_color: item.product_color,
                            product_description: item.product_description,
                            product_name: item.product_name,
                            product_preview_url: item.product_preview_url,
                            product_price: item.product_price,
                            product_rate: item.product_rate,
                            product_type: item.product_type,
                        };
                    }),
            );
        } else {
            setDataSource(
                data.map((item: IOrders) => {
                    return {
                        key: item.orders_id,
                        customer_address: item.customer_address,
                        customer_avatar_path: item.customer_avatar_path,
                        customer_birth_date: item.customer_birth_date,
                        customer_gender: item.customer_gender,
                        customer_name: item.customer_name,
                        customer_phone_number: item.customer_phone_number,
                        orders_created_at: item.orders_created_at,
                        orders_customer_id: item.orders_customer_id,
                        orders_id: item.orders_id,
                        orders_price: item.orders_price,
                        orders_product_id: item.orders_product_id,
                        orders_quantity: item.orders_quantity,
                        orders_status: item.orders_status,
                        product_color: item.product_color,
                        product_description: item.product_description,
                        product_name: item.product_name,
                        product_preview_url: item.product_preview_url,
                        product_price: item.product_price,
                        product_rate: item.product_rate,
                        product_type: item.product_type,
                    };
                }),
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    const columns = useMemo(
        () => [
            {
                title: 'STT',
                dataIndex: 'key',
                key: 'stt',
            },
            {
                title: 'User order',
                dataIndex: 'customer_name',
                key: 'customer_name',
            },
            {
                title: 'Name',
                dataIndex: 'product_name',
                key: 'name',
            },
            {
                title: 'Create order',
                dataIndex: 'orders_created_at',
                key: 'orders_created_at',
                render: (item: string) => (
                    <div>
                        <p
                            style={{
                                width: 'max-content',
                            }}
                        >
                            {Helper.formatTime(item)}
                        </p>
                    </div>
                ),
            },
            {
                title: 'Quantity',
                dataIndex: 'orders_quantity',
                key: 'quantity',
            },
            {
                title: 'Price',
                dataIndex: 'product_price',
                key: 'price',
                render: (item: number) => (
                    <div>
                        <p>{Helper.formatVND.format(item)}</p>
                    </div>
                ),
            },
            {
                title: 'Total Amount',
                dataIndex: 'orders_price',
                key: 'total_amount',
                render: (item: number) => (
                    <div>
                        <p>{Helper.formatVND.format(item)}</p>
                    </div>
                ),
            },
            {
                title: 'Status',
                dataIndex: 'orders_status',
                key: 'orders_status',
                render: (item: string) => (
                    <div>
                        <p
                            style={{
                                width: 'max-content',
                            }}
                        >
                            {Helper.getNameFromStatus(item)}
                        </p>
                    </div>
                ),
            },
            {
                title: 'Actions',
                key: 'actions',
                render: (item: any) => (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                            style={{ marginRight: '8px' }}
                            onClick={() => {
                                setStatus({
                                    id: item.orders_id,
                                    status: item.orders_status,
                                });
                                setIsOpen(true);
                            }}
                            type="primary"
                        >
                            Sửa
                        </Button>
                        <Button onClick={() => handleCancelOrder(item.orders_id)} type="default">
                            Hủy đơn
                        </Button>
                    </div>
                ),
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    const handleCancelOrder = (orderId: number) => {
        message?.modal.confirm({
            title: 'Hủy đơn hàng',
            content: 'Bạn có chắc chắn muốn hủy đơn hàng này không!',
            okText: 'Đồng ý',
            cancelText: 'Hủy',
            onOk: () => {
                apiService.orders
                    .updateStatus(orderId.toString(), {
                        status: 'cancel',
                    })
                    .then((res) => {
                        if (res.message === 'success') {
                            message?.message.success('Hủy đơn hàng thành công!').then();
                            apiService.orders
                                .getOrders()
                                .then((res) => {
                                    if (res.message === 'success') {
                                        setData(res.data as IOrders[]);
                                        setIsOpen(false);
                                    }
                                })
                                .catch((err) => console.error(err));
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                        message.message.error('Hủy đơn hàng không thành công, vui lòng thử lại!').then();
                    });
            },
        });
    };

    return (
        <div className={cx('orders')}>
            <div className={cx('searching')}>
                <AiOutlineSearch size={'2.2rem'} />
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="Tìm kiếm..."
                />
            </div>
            <Modal
                open={isOpen}
                onCancel={() => setIsOpen(false)}
                footer={
                    <>
                        <Button
                            type="primary"
                            onClick={() => {
                                apiService.orders
                                    .updateStatus((status?.id as number).toString(), {
                                        status: status?.status,
                                    })
                                    .then((res) => {
                                        if (res.message === 'success') {
                                            message?.message.success('Update thành công!').then();

                                            ////// testttttt => no OK
                                            apiService.orders
                                                .getOrders()
                                                .then((res) => {
                                                    if (res.message === 'success') {
                                                        setData(res.data as IOrders[]);
                                                        setIsOpen(false);
                                                    }
                                                })
                                                .catch((err) => console.error(err));
                                        } else {
                                            message?.message.error('Update thất bại, vui lòng thử lại!').then();
                                            setIsOpen(false);
                                        }
                                    })
                                    .catch((err) => console.error(err));
                            }}
                        >
                            Ok
                        </Button>
                        <Button type="default" onClick={() => setIsOpen(false)}>
                            Hủy
                        </Button>
                    </>
                }
                title="Trạng thái đơn hàng"
            >
                <Select
                    value={status?.status}
                    style={{ width: '100%' }}
                    onChange={(value: string) => {
                        setStatus((prev: any) => {
                            return {
                                ...prev,
                                status: value,
                            };
                        });
                    }}
                    options={[
                        { value: 'processing', label: 'Processing' },
                        { value: 'shipping', label: 'Shipping' },
                        { value: 'finished', label: 'Finished' },
                    ]}
                />
            </Modal>

            <div className={cx('contents')}>
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

export default Orders;
