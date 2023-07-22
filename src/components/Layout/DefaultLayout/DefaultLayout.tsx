import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import { Header } from '../components/Header';
import { SideBar } from '../components/SideBar';
import { Footer } from '../components/Footer';

const cx = classNames.bind(styles);

type TProps = {
    children: React.ReactElement;
};

function DefaultLayout(props: TProps): JSX.Element {
    const [isSideBar, setIsSideBar] = useState<boolean>(true);

    return (
        <div className={cx('wrapper')}>
            <SideBar isOpen={isSideBar} />
            <div className={cx('container')}>
                <Header setIsOpen={setIsSideBar} isOpen={isSideBar} />
                <div className={cx('wrapper-contents')}>
                    <div className={cx('contents')}>{props.children}</div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;
