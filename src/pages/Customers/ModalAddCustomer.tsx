import { Form, FormInstance, Input, InputNumber, Modal } from 'antd';
import classNames from 'classnames/bind';
import styles from './Customers.module.scss';
import { Dispatch, useEffect } from 'react';
import { useAntContext } from '../../contexts/AntContexts';
import { TFormAdd } from './Customers';
import { ApiService } from '../../axios/ApiService';
import { Customers } from '../../models/Products';

const cx = classNames.bind(styles);

type TProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    form: FormInstance;
    setDataSource: Dispatch<React.SetStateAction<Customers[]>>;
};

function ModalAddCustomer(props: TProps) {
    const message = useAntContext();
    const apiService = new ApiService();

    useEffect(() => {
        props.form.resetFields();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.open]);

    const handleFinish = (values: TFormAdd) => {
        console.log('values: ', values);

        apiService.customers
            .createCustomer(values)
            .then((res) => {
                if (res.message === 'success') {
                    message?.message.success('Thêm thành công!').then();
                    props.setDataSource((prev) => {
                        return [
                            ...prev,
                            {
                                key: res.data.id,
                                address: res.data.address,
                                avatarPath: res.data.avatar_path,
                                birthDate: res.data.birth_date,
                                email: res.data.email,
                                gender: res.data.gender,
                                name: res.data.name,
                                phoneNumber: res.data.phone_number,
                                id: res.data.id,
                            },
                        ];
                    });
                    props.setOpen(false);
                }
            })
            .catch((err) => console.error(err));
    };

    const handleFinishError = () => {
        message?.message.error('Có lỗi, vui lòng kiểm tra lại!');
    };

    return (
        <Modal
            open={props.open}
            title="Thêm người dùng mới"
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
                    name="add_customer"
                    onFinish={handleFinish}
                    onFinishFailed={handleFinishError}
                >
                    <Form.Item
                        name="name"
                        label="Tên người dùng"
                        rules={[
                            {
                                required: true,
                                min: 3,
                                max: 99,
                                message: 'Vui lòng nhập tên người dùng',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Mật khẩu"
                        rules={[
                            {
                                required: true,
                                min: 3,
                                max: 99,
                                message: 'Vui lòng nhập mật khẩu',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                                required: true,
                                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                message: 'Định dạng email không đúng!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="address" label="Địa chỉ">
                        <Input />
                    </Form.Item>
                    <Form.Item name="gender" label="Giới tính">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        rules={[{ type: 'number', min: 3, message: 'Định dạng phải là số' }]}
                        name="phone_number"
                        label="Số điện thoại"
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="avatar_path" label="Ảnh đại diện (URL)">
                        <Input />
                    </Form.Item>
                    <Form.Item name="birth_date" label="Ngày sinh">
                        <Input />
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
}

export default ModalAddCustomer;
