import { useEffect, useState } from 'react';
import { ApiService } from '../../axios/ApiService';
import classNames from 'classnames/bind';
import styles from './Blog.module.scss';
import FormAddBlog from './FormAddBlog';
import { Form } from 'antd';
import FormUpdateBlog from './FormUpdateBlog';
import { useAntContext } from '../../contexts/AntContexts';
import { useAppContext } from '../../providers/AppProvider';
import { socketContext } from '../../contexts/socketContext';
import { Helper } from '../../helper';

const cx = classNames.bind(styles);

function Blogs() {
    const apiService = new ApiService();
    const [data, setData] = useState([]);
    const message = useAntContext();
    const [dataUpdate, setDataUpdate] = useState();
    const [isAdd, setIsAdd] = useState(false);
    const [formAdd] = Form.useForm<{
        title: string;
        content: string;
        description: string;
        preview_url: string;
    }>();
    const [formUpdate] = Form.useForm<{
        title: string;
        content: string;
        description: string;
        preview_url: string;
    }>();
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
        apiService.blogs
            .getBlogs()
            .then((res) => {
                setData(res.data);
            })

            .catch((err) => {
                console.log(err);
            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = (id: any) => {
        message?.modal.confirm({
            title: 'Thông báo',
            content: 'Bạn có chắc chắn muốn xóa không?',
            okText: 'Xóa',
            cancelText: 'Hủy',
            onOk: () => {
                apiService.blogs
                    .deleteBlog(id.toString())
                    .then((res) => {
                        console.log(res);

                        if (res.message === 'success') {
                            message.message.success('Xóa thành công!').then();

                            setData((prev) => prev.filter((data: any) => data.id !== id));
                        }
                    })
                    .catch((err) => console.error(err));
            },
        });
    };

    return (
        <div className={cx('blogs-container')}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <div></div>
                <h3 className={cx('title')}>Tất cả bài viết</h3>
                <button
                    style={{
                        padding: '10px 14px',
                        border: 'none',
                        backgroundColor: 'orange',
                        color: '#fff',
                        cursor: 'pointer',
                        borderRadius: '4px',
                        marginRight: '8px',
                    }}
                    onClick={() => setIsAdd(true)}
                >
                    Thêm bài viết
                </button>
            </div>
            <div className={cx('list-item')}>
                {data.map((item: any) => (
                    <div key={item.id} className={cx('new-item')}>
                        <div className={cx('wrapper-item')}>
                            <div className={cx('item-thumb')}>
                                <img src={item.preview_url} alt="thumbnail" />
                            </div>
                            <div className={cx('item-info')}>
                                <h3 className={cx('heading-title')}>{item.title}</h3>
                                <p className={cx('item-description')}>{item.description}</p>
                            </div>
                            <div className={cx('actions')}>
                                <FormAddBlog form={formAdd} open={isAdd} setOpen={setIsAdd} setData={setData} />
                                <FormUpdateBlog
                                    setData={setData}
                                    form={formUpdate}
                                    data={dataUpdate}
                                    open={dataUpdate}
                                    setOpen={setDataUpdate}
                                />
                                <button onClick={() => handleDelete(item.id)} className={cx('btn-delete')}>
                                    Xóa bài viết
                                </button>
                                <button onClick={() => setDataUpdate(item)} className={cx('btn-update')}>
                                    Sửa
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Blogs;
