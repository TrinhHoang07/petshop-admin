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
    data: _T_FormProducts | undefined;
    form: FormInstance;
    setData: Dispatch<React.SetStateAction<I_Products[]>>;
};

function ModalUpdateProducts(props: T_Props) {
    const apiService = new ApiService();
    const message = useAntContext();

    useEffect(() => {
        props.form.setFieldsValue({
            name: props?.data?.name,
            description: props.data?.description,
            preview_url: props.data?.preview_url,
            color: props.data?.color,
            price: props.data?.price,
            quantity: props.data?.quantity,
            sub_description: props.data?.sub_description,
            type: props.data?.type,
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.data]);

    const handleFinish = (values: _T_FormProducts) => {
        if (props.data?.key) {
            apiService.products
                .updateProduct(props.data.key.toString(), JSON.stringify(values))
                .then((res) => {
                    console.log(res);

                    if (res.message === 'success') {
                        message?.message.success('Cập nhật thành công!').then();
                        props.setData((prev) => {
                            const data = [...prev];
                            const index = data.findIndex((item) => item.id === props.data?.key);

                            if (index !== -1) {
                                data[index] = {
                                    ...data[index],
                                    name: values.name,
                                    preview_url: values.preview_url,
                                    price: values.price,
                                    quantity: values.quantity,
                                    type: values.type,
                                    color: values.color,
                                    description: values.description,
                                    sub_description: values.sub_description,
                                };
                            }

                            return data;
                        });
                        props.setOpen(false);
                    }
                })
                .catch((err) => console.error(err));
        }
    };

    const handleFinishError = () => {
        message?.message.error('Có lỗi, vui lòng kiểm tra lại!');
    };

    return (
        <Modal
            open={props.open}
            title="Cập nhật sản phẩm"
            onCancel={() => props.setOpen(false)}
            width={'50%'}
            okText="Cập nhật"
            onOk={() => props.form.submit()}
            forceRender
        >
            <div className={cx('form-container')}>
                <Form
                    form={props.form}
                    layout="vertical"
                    autoComplete="off"
                    name="update_product"
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

export default ModalUpdateProducts;
