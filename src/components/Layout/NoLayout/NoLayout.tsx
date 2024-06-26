// import classNames from 'classnames/bind';
// import styles from './NoLayout.module.scss';

// const cx = classNames.bind(styles);

type TProps = {
    children: React.ReactElement;
};

function NoLayout(props: TProps): JSX.Element {
    return <div>{props.children}</div>;
}

export default NoLayout;
