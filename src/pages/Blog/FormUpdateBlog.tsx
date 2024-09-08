import { Form, Input, Modal } from 'antd';
import classNames from 'classnames/bind';
import styles from './Blog.module.scss';
import { useEffect } from 'react';
import { ApiService } from '../../axios/ApiService';
import { useAntContext } from '../../contexts/AntContexts';

const cx = classNames.bind(styles);

function FormUpdateBlog(props: any) {
    const apiService = new ApiService();
    const message = useAntContext();

    const handleFinish = (values: any) => {
        apiService.blogs
            .updateBlog(props.data.id, values)
            .then((res) => {
                if (res.message === 'success') {
                    message?.message.success('Cập nhật thành công!').then();
                    props.setData((prev: any[]) => {
                        const data = [...prev];
                        const index = data.findIndex((item) => item.id === props.data?.id);
                        if (index !== -1) {
                            data[index] = { ...res.data };
                        }
                        return data;
                    });
                    props.setOpen(false);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        props.form.setFieldsValue({
            title: props?.data?.title,
            description: props.data?.description,
            preview_url: props.data?.preview_url,
            content: props.data?.content,
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.data]);

    return (
        <Modal
            open={props.open}
            title="Thêm sản phẩm mới"
            onCancel={() => props.setOpen(null)}
            width={'50%'}
            okText="Cập nhật"
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

export default FormUpdateBlog;
