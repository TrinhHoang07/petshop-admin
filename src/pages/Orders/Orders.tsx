import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Orders.module.scss';
import { ApiService } from '../../axios/ApiService';
import { Orders as IOrders } from '../../models/Orders';
import { Table } from 'antd';
import { Loading } from '../../components/Loading';

const cx = classNames.bind(styles);

interface _IDataOrders extends IOrders {
    key: number;
}

function Orders() {
    // const [dataSource, setDataSource] = useState<Orders[]>([]);
    const [data, setData] = useState<IOrders[]>([]);
    const [dataSource, setDataSource] = useState<_IDataOrders[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const apiService = new ApiService();

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
        console.log('data: ', data);

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
            },
            {
                title: 'Total Amount',
                dataIndex: 'orders_price',
                key: 'total_amount',
            },
            {
                title: 'Status',
                dataIndex: 'orders_status',
                key: 'orders_status',
            },
            {
                title: 'Actions',
                key: 'actions',
                render: (item: any) => (
                    <>
                        <p>hehehe</p>
                        <p>hehehe</p>
                    </>
                ),
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    return (
        <div className={cx('orders')}>
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
