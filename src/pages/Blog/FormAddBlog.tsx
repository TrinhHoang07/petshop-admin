import { Form, Input, Modal } from 'antd';
import classNames from 'classnames/bind';
import styles from './Blog.module.scss';
import { ApiService } from '../../axios/ApiService';
import { useAntContext } from '../../contexts/AntContexts';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function FormAddBlog(props: any) {
    const apiService = new ApiService();
    const message = useAntContext();

    useEffect(() => {
        props.form.resetFields();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.open]);

    const handleFinish = (values: any) => {
        apiService.blogs
            .createBlog(values)
            .then((res) => {
                if (res.message === 'success') {
                    message?.message.success('Thêm thành công!').then();
                    props.setOpen(false);
                    props.setData((prev: any) => [...prev, res.data]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Modal
            open={props.open}
            title="Thêm sản phẩm mới"
            onCancel={() => props.setOpen(false)}
            width={'50%'}
            okText="Thêm mới"
            cancelText="Hủy bỏ"
            onOk={() => props.form.submit()}
            forceRender
        >
            <div className={cx('form-container')}>
                <Form
                    form={props.form}
                    layout="vertical"
                    autoComplete="off"
                    name="add_blog"
                    onFinish={handleFinish}
                    // onFinishFailed={handleFinishError}
                >
                    <Form.Item
                        name="title"
                        label="Tiêu đề bài viết"
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
                    <Form.Item name="description" label="Mô tả bài viết">
                        <Input />
                    </Form.Item>
                    <Form.Item name="content" label="Nội dung bài viết">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item
                        name="preview_url"
                        label="Ảnh"
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
                </Form>
            </div>
        </Modal>
    );
}

export default FormAddBlog;
