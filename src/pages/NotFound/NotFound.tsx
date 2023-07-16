import classNames from 'classnames/bind';
import styles from './NotFound.module.scss';
import notFound from '../../assets/images/notFound.jpg';
import { Link } from 'react-router-dom';
import routesConfig from '../../config/routes';

const cx = classNames.bind(styles);

function NotFound(): JSX.Element {
    return (
        <div className={cx('not-found')}>
            <div className={cx('wrapper')}>
                <div className={cx('image-notfound')}>
                    <img src={notFound} alt="not found images" />
                </div>
                <div className={cx('info')}>
                    <p className={cx('not-url')}>Không tìm thấy đường dẫn {window.location.href}</p>
                    <Link to={routesConfig.home} className={cx('btn-home')}>
                        Trang chủ
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
