import { useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { CardHome } from '../../components/CardHome';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import Chart from 'chart.js/auto';
import 'swiper/css';
import 'swiper/css/pagination';
import './custom.scss';

const cx = classNames.bind(styles);

function Home(): JSX.Element {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chart = useRef<any>();

    useEffect(() => {
        if (chartRef.current) {
            chart.current = new Chart(chartRef.current, {
                type: 'line',
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false,
                        },
                        title: {
                            text: 'Biểu đồ thống kê',
                            display: true,
                            font: {
                                size: 24,
                                weight: 'bold',
                            },
                        },
                    },
                    interaction: {
                        intersect: false,
                    },
                    scales: {
                        x: {
                            display: true,
                            title: {
                                display: true,
                            },
                        },
                        y: {
                            display: true,
                            title: {
                                display: false,
                                text: 'Value',
                            },
                            suggestedMin: -10,
                            suggestedMax: 200,
                        },
                    },
                },
                data: {
                    labels: [
                        'Tháng 1',
                        'Tháng 2',
                        'Tháng 3',
                        'Tháng 4',
                        'Tháng 5',
                        'Tháng 6',
                        'Tháng 7',
                        'Tháng 8',
                        'Tháng 9',
                        'Tháng 10',
                        'Tháng 11',
                        'Tháng 12',
                    ],
                    datasets: [
                        {
                            label: 'Số lượng đơn hàng (đã bán)',
                            data: [0, 20, 20, 60, 60, 120, 100, 180, 120, 125, 105, 110, 170],
                            borderColor: 'red',
                            fill: false,
                            cubicInterpolationMode: 'monotone',
                            tension: 0.4,
                        },
                        {
                            label: 'Số lượng người dùng',
                            data: [0, 10, 35, 55, 68, 83, 95, 110, 119, 125, 155, 200, 210],
                            borderColor: 'blue',
                            fill: false,
                            cubicInterpolationMode: 'monotone',
                            tension: 0.4,
                        },
                        {
                            label: 'Số sản phẩm đang có',
                            data: [0, 5, 10, 18, 20, 29, 50, 62, 88, 111, 121, 150, 180],
                            borderColor: 'yellow',
                            fill: false,
                            cubicInterpolationMode: 'monotone',
                            tension: 0.4,
                        },
                    ],
                },
            });
        }

        return () => {
            chart.current.destroy();
        };
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header-home')}>
                <CardHome title="Đơn hàng hôm nay" subTitle="Tiến triển tốt" value={99} type="orders" redirect="/" />
                <CardHome
                    title="Tổng số người dùng"
                    subTitle="Đang tăng vọt"
                    value={5799}
                    type="users"
                    redirect="/customers"
                />
                <CardHome
                    title="Tổng số sản phẩm"
                    subTitle="Nhiều hàng mới về"
                    value={388}
                    type="products"
                    redirect="/products"
                />
                <CardHome title="Tổng số đơn hàng" subTitle="Tăng vọt" value={2179} type="ordered" redirect="/" />
            </div>
            <div className={cx('popular-container')}>
                <h3>sản phẩm bán chạy nhất tuần</h3>
                <div className={cx('slider-popular-week')}>
                    <Swiper
                        className={'popupar-week-swiper'}
                        slidesPerView={3}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                        }}
                        modules={[Navigation, Autoplay]}
                        spaceBetween={16}
                        navigation
                    >
                        <SwiperSlide>
                            <div className={cx('item-popular')}>
                                <div className={cx('info-popu')}>
                                    <h1>Mèo Anh Lông Ngắn</h1>
                                    <button>Xem thêm</button>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className={cx('item-popular')}>
                                <div className={cx('info-popu')}>
                                    <h1>Chó Alaska</h1>
                                    <button>Xem thêm</button>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className={cx('item-popular')}>
                                <div className={cx('info-popu')}>
                                    <h1>Mèo Anh Lông Dài</h1>
                                    <button>Xem thêm</button>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className={cx('item-popular')}>
                                <div className={cx('info-popu')}>
                                    <h1>Chó Cỏ Việt Nam</h1>
                                    <button>Xem thêm</button>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className={cx('item-popular')}>
                                <div className={cx('info-popu')}>
                                    <h1>Hạt cỡ lớn cho</h1>
                                    <button>Xem thêm</button>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
            <div className={cx('chart-statistical')}>
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    );
}

export default Home;
