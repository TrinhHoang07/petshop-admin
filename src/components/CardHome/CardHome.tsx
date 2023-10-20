import classNames from 'classnames/bind';
import styles from './CardHome.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

type _T_Props = {
    title: string;
    value: number;
    subTitle: string;
    type: string;
    redirect: string;
};

function CardHome(props: _T_Props) {
    return (
        <div className={cx('card-home')}>
            <div className={cx('container')}>
                <h3>{props.title}</h3>
                <h5>
                    {props.value} <span>{props.type}</span>
                </h5>
                <p>
                    <span>{props.subTitle}</span>
                    <Link to={props.redirect}>Chi tiết</Link>
                </p>
            </div>
        </div>
    );
}

export default CardHome;
