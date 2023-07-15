import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

type TProps = {
    children: React.ReactElement;
};

function DefaultLayout(props: TProps): JSX.Element {
    return <div>{props.children}</div>;
}

export default DefaultLayout;
