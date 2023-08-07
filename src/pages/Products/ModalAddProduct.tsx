import classNames from 'classnames/bind';
import styles from './Products.module.scss';
import { Modal, Form, Input, InputNumber, Select, FormInstance } from 'antd';
import { Dispatch, useEffect } from 'react';
import { useAntContext } from '../../contexts/AntContexts';
import { _T_FormProducts } from './Products';
import { Products as I_Products } from '../../models/Products';
import { ApiService } from '../../axios/ApiService';

const cx = classNames.bind(styles);

type T_Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    form: FormInstance;
    setData: Dispatch<React.SetStateAction<I_Products[]>>;
};

function ModalAddProducts(props: T_Props) {
    const apiService = new ApiService();
    const message = useAntContext();

    useEffect(() => {
        props.form.resetFields();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.open]);

    const handleFinish = (values: _T_FormProducts) => {
        console.log('values: ', values);

        apiService.products
            .createProduct(values)
            .then((res) => {
                if (res.success) {
                    console.log(res);
                    message?.message.success('Thêm thành công!').then();
                    props.setData((prev) => [
                        ...prev,
                        {
                            id: res.data.id,
                            name: res.data.name,
                            preview_url: res.data.preview_url,
                            price: res.data.price,
                            quantity: res.data.quantity,
                            rate: res.data.rate,
                            type: res.data.type,
                            color: res.data.color,
                            description: res.data.description,
                            sub_description: res.data.sub_description,
                            created_at: res.data.created_at,
                        },
                    ]);
                    props.setOpen(false);
                }
            })
            .catch((err) => console.log(err));
    };

    const handleFinishError = () => {
        message?.message.error('Có lỗi, vui lòng kiểm tra lại!');
    };

    return (
        <Modal
            open={props.open}
            title="Thêm sản phẩm mới"
            onCancel={() => props.setOpen(false)}
            width={'50%'}
            okText="Thêm mới"
            onOk={() => props.form.submit()}
            forceRender
        >
            <div className={cx('form-container')}>
                <Form
                    form={props.form}
                    layout="vertical"
                    autoComplete="off"
                    name="add_product"
                    onFinish={handleFinish}
                    onFinishFailed={handleFinishError}
                >
                    <Form.Item
                        name="name"
                        label="Tên sản phẩm"
                        rules={[
                            {
                                required: true,
                                min: 3,
                                max: 99,
                                message: 'Vui lòng nhập tên sản phẩm',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Mô tả sản phẩm">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item name="sub_description" label="Mô tả bổ sung cho sản phẩm">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item
                        name="preview_url"
                        label="Ảnh sản phẩm"
                        rules={[
                            {
                                required: true,
                                pattern: /\/\/(\S+?(?:jpe?g|png|gif))/gi,
                                message: 'Định dạng ảnh không đúng!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Giá sản phẩm"
                        rules={[
                            {
                                required: true,
                                message: 'Giá không hợp lệ!',
                                type: 'integer',
                            },
                        ]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        name="quantity"
                        label="Số lượng sản phẩm"
                        rules={[
                            {
                                required: true,
                                message: 'Số lượng không hợp lệ!',
                                type: 'integer',
                            },
                        ]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        name="type"
                        label="Loại sản phẩm"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn loại sản phẩm!',
                            },
                        ]}
                    >
                        <Select>
                            <Select.Option value="dog">Dog</Select.Option>
                            <Select.Option value="cat">Cat</Select.Option>
                            <Select.Option value="food">Food</Select.Option>
                            <Select.Option value="accessory">Accessory</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="color" label="Màu (Thú cưng)">
                        <Input />
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
}

export default ModalAddProducts;
