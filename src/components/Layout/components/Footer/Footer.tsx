import classNames from 'classnames/bind';

import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer className={cx('footer')}>
            <div className={cx('author')}>
                <p>
                    © 2023. Design by Hoang Trinh <span>❤</span>
                </p>
            </div>
        </footer>
    );
}

export default Footer;
