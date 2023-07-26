import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { ApiService } from '../../axios/ApiService';

const cx = classNames.bind(styles);

function Home(): JSX.Element {
    const apiService = new ApiService();

    const callApi = () => {
        apiService.products
            .getProduct('1', {
                name: '123',
                des: 'heheheh',
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => console.error(err));
    };

    return (
        <div className={cx('wrapper')} style={{ textAlign: 'center' }}>
            <button onClick={callApi} style={{ padding: 16 }}>
                Call api
            </button>
        </div>
    );
}

export default Home;
