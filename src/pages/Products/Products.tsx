import { useState, useEffect, useMemo } from 'react';
import classNames from 'classnames/bind';
import styles from './Products.module.scss';
import { MdPets } from 'react-icons/md';
import { FaDog, FaCat } from 'react-icons/fa';
import { GiOpenedFoodCan } from 'react-icons/gi';
import { Button, Table, Typography, Form } from 'antd';
import ModalDescription from './ModalDescription';
import { useAntContext } from '../../contexts/AntContexts';
import ModalAddProducts from './ModalAddProduct';
import ModalUpdateProducts from './ModalUpdateProduct';
import { Loading } from '../../components/Loading';
import { Products as I_Products } from '../../models/Products';

const cx = classNames.bind(styles);

export type _T_FormProducts = {
    key: number;
    name: string;
    description?: string;
    sub_description?: string;
    preview_url: string;
    price: number;
    quantity: number;
    type: string;
    color?: string;
};

// type sourceData = Omit<_T_FormProducts, 'sub_description' | 'preview_url'> & {
//     key: number;
// };

function Products() {
    const [activeHeader, setActiveHeader] = useState<string>('all');
    const [description, setDescription] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isModalAdd, setIsModalAdd] = useState<boolean>(false);
    const [isModalUpdate, setIsModalUpdate] = useState<boolean>(false);
    const [data, setData] = useState<I_Products[]>([]);
    const [dataSource, setDataSource] = useState<_T_FormProducts[]>([]);
    const [dataUpdate, setDataUpdate] = useState<_T_FormProducts>();
    const message = useAntContext();
    const [formAdd] = Form.useForm<_T_FormProducts>();
    const [formUpdate] = Form.useForm<_T_FormProducts>();

    const handleFilterData = (data: I_Products[], type?: string): _T_FormProducts[] => {
        if (type) {
            return data
                .filter((item: I_Products) => item.type === type)
                .map((item: I_Products) => ({
                    key: item.id,
                    preview_url: item.preview_url,
                    name: item.name,
                    description: item.description,
                    type: item.type,
                    price: item.price,
                    quantity: item.quantity,
                    color: item.color,
                }));
        }

        return data.map((item: I_Products) => ({
            key: item.id,
            name: item.name,
            description: item.description,
            preview_url: item.preview_url,
            type: item.type,
            price: item.price,
            quantity: item.quantity,
            color: item.color,
        }));
    };

    useEffect(() => {
        fetch('http://localhost:3009/products/all')
            .then((res) => res.json())
            .then((data: I_Products[]) => {
                setData(data);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        setDataSource(handleFilterData(data));
    }, [data]);

    useEffect(() => {
        dataSource.length > 0 && setIsLoading(false);
    }, [dataSource]);

    useEffect(() => {
        switch (activeHeader) {
            case 'dog':
                setDataSource(handleFilterData(data, 'dog'));
                break;
            case 'cat':
                setDataSource(handleFilterData(data, 'cat'));
                break;
            case 'food':
                setDataSource(handleFilterData(data, 'food'));
                break;
            default:
                setDataSource(handleFilterData(data));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeHeader]);

    const columns = useMemo(
        () => [
            {
                title: 'STT',
                dataIndex: 'key',
                key: 'stt',
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
                render: (item: string) => (
                    <Typography.Text
                        onClick={() => {
                            if (item) {
                                setDescription(item);
                            } else {
                                message?.message.error('Không có mô tả!');
                            }
                        }}
                        className={cx('detail-description')}
                    >
                        Chi tiết
                    </Typography.Text>
                ),
            },
            {
                title: 'Type',
                dataIndex: 'type',
                key: 'type',
            },
            {
                title: 'Price',
                dataIndex: 'price',
                key: 'price',
            },
            {
                title: 'Quantity',
                dataIndex: 'quantity',
                key: 'quantity',
            },
            {
                title: 'Color',
                dataIndex: 'color',
                key: 'color',
            },
            {
                title: 'Actions',
                key: 'actions',
                render: (item: _T_FormProducts) => (
                    <>
                        <Button
                            onClick={() => {
                                setIsModalUpdate(true);
                                setDataUpdate(() => ({
                                    key: item.key,
                                    name: item.name,
                                    preview_url: item.preview_url,
                                    price: item.price,
                                    quantity: item.quantity,
                                    type: item.type,
                                    color: item.color,
                                    description: item.description,
                                    sub_description: item.sub_description,
                                }));
                            }}
                            type="primary"
                        >
                            Sửa
                        </Button>
                        <Button
                            onClick={() => {
                                message?.modal.confirm({
                                    title: 'Thông báo',
                                    content: 'Bạn có chắc chắn muốn xóa không?',
                                    okText: 'Xóa',
                                    cancelText: 'Hủy',
                                    onOk: () => {
                                        console.log('id delete: ', item.key);
                                        // CALL API DELETE HERE
                                    },
                                });
                            }}
                            style={{ marginLeft: '8px' }}
                            type="default"
                        >
                            Xóa
                        </Button>
                    </>
                ),
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('list-options')}>
                    <div
                        onClick={() => setActiveHeader('all')}
                        style={{
                            color: activeHeader === 'all' ? '#fff' : '',
                        }}
                        className={cx('item-option')}
                    >
                        <span>
                            <MdPets size={'2rem'} />
                        </span>
                        <p>Tất Cả</p>
                    </div>
                    <div
                        onClick={() => setActiveHeader('dog')}
                        style={{
                            color: activeHeader === 'dog' ? '#fff' : '',
                        }}
                        className={cx('item-option')}
                    >
                        <span>
                            <FaDog size={'2rem'} />
                        </span>
                        <p>Chó Cưng</p>
                    </div>
                    <div
                        onClick={() => setActiveHeader('cat')}
                        style={{
                            color: activeHeader === 'cat' ? '#fff' : '',
                        }}
                        className={cx('item-option')}
                    >
                        <span>
                            <FaCat size={'2rem'} />
                        </span>
                        <p>Mèo Cưng</p>
                    </div>
                    <div
                        onClick={() => setActiveHeader('food')}
                        style={{
                            color: activeHeader === 'food' ? '#fff' : '',
                        }}
                        className={cx('item-option')}
                    >
                        <span>
                            <GiOpenedFoodCan size={'2rem'} />
                        </span>
                        <p>Đồ Ăn</p>
                    </div>
                </div>
                <div className={cx('actions')}>
                    <Button
                        onClick={() => setIsModalAdd(true)}
                        className={cx('add-products')}
                        type="primary"
                        size="large"
                    >
                        Thêm Sản Phẩm
                    </Button>
                    <ModalAddProducts form={formAdd} open={isModalAdd} setOpen={setIsModalAdd} />
                </div>
            </div>
            <div className={cx('contents')}>
                {isLoading ? (
                    <div className={cx('wrapper-loading')}>
                        <Loading />
                    </div>
                ) : (
                    <Table columns={columns} dataSource={dataSource} />
                )}
                <ModalDescription description={description} setDescription={setDescription} />
                <ModalUpdateProducts
                    form={formUpdate}
                    open={isModalUpdate}
                    setOpen={setIsModalUpdate}
                    data={dataUpdate}
                />
            </div>
        </div>
    );
}

export default Products;
