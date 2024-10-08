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
import { ApiService } from '../../axios/ApiService';
import { useAppContext } from '../../providers/AppProvider';
import { socketContext } from '../../contexts/socketContext';
import { Helper } from '../../helper';
import { AiOutlineSearch } from 'react-icons/ai';

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

function Products() {
    const apiService = new ApiService();
    const [activeHeader, setActiveHeader] = useState<string>('all');
    const [description, setDescription] = useState<string>('');
    const [search, setSearch] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isModalAdd, setIsModalAdd] = useState<boolean>(false);
    const [isModalUpdate, setIsModalUpdate] = useState<boolean>(false);
    const [data, setData] = useState<I_Products[]>([]);
    const [dataSource, setDataSource] = useState<_T_FormProducts[]>([]);
    const [dataUpdate, setDataUpdate] = useState<_T_FormProducts>();
    const message = useAntContext();
    const [formAdd] = Form.useForm<_T_FormProducts>();
    const [formUpdate] = Form.useForm<_T_FormProducts>();
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
                    sub_description: item.sub_description,
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
            sub_description: item.sub_description,
        }));
    };

    useEffect(() => {
        apiService.products
            .getProducts()
            .then((data: { message: string; statusCode: number; data: I_Products[] }) => {
                console.log(data);

                setData(data.data);
            })
            .catch((err) => console.log(err));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setDataSource(handleFilterData(data));
    }, [data]);

    useEffect(() => {
        if (search.trim().length > 0) {
            setDataSource(
                handleFilterData(
                    data.filter((item) => item.name.includes(search.trim())),
                    activeHeader !== 'all' ? activeHeader : '',
                ),
            );
        } else {
            setDataSource(handleFilterData(data, activeHeader !== 'all' ? activeHeader : ''));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

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
            case 'accessory':
                setDataSource(handleFilterData(data, 'accessory'));
                break;
            default:
                setDataSource(handleFilterData(data));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeHeader, data]);

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

                                        apiService.products
                                            .deleteProduct(item.key.toString())
                                            .then((res) => {
                                                console.log(res);

                                                if (res.message === 'success') {
                                                    message.message.success('Xóa thành công!').then();

                                                    setData((prev) => prev.filter((data) => data.id !== item.key));

                                                    // setDataSource((prev) =>
                                                    //     prev.filter((data) => data.key !== item.key),
                                                    // );
                                                }
                                            })
                                            .catch((err) => console.error(err));
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
                <div>
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
                            <p>Tất cả</p>
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
                            <p>Chó cưng</p>
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
                            <p>Mèo cưng</p>
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
                            <p>Đồ ăn</p>
                        </div>
                        <div
                            onClick={() => setActiveHeader('accessory')}
                            style={{
                                color: activeHeader === 'accessory' ? '#fff' : '',
                            }}
                            className={cx('item-option')}
                        >
                            <span>
                                <GiOpenedFoodCan size={'2rem'} />
                            </span>
                            <p>Phụ kiện</p>
                        </div>
                    </div>
                    <div className={cx('searching')}>
                        <AiOutlineSearch size={'2.2rem'} />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            placeholder="Tìm kiếm..."
                        />
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
                    <ModalAddProducts form={formAdd} open={isModalAdd} setOpen={setIsModalAdd} setData={setData} />
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
                    setData={setData}
                />
            </div>
        </div>
    );
}

export default Products;
