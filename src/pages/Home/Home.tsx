import { useRef, useEffect, useState, useMemo } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { CardHome } from '../../components/CardHome';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import Chart from 'chart.js/auto';
import 'swiper/css';
import 'swiper/css/pagination';
import './custom.scss';
import { socketContext } from '../../contexts/socketContext';
import { Helper } from '../../helper';
import { useAppContext } from '../../providers/AppProvider';
import { ApiService } from '../../axios/ApiService';

const cx = classNames.bind(styles);

function Home(): JSX.Element {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chart = useRef<any>();
    const [data, setData] = useState<any>({});
    const { isConnected } = useAppContext();
    const apiService = new ApiService();

    const monthCurrent = useMemo(() => {
        return new Date().getMonth() + 1;
    }, []);

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
        apiService.orders
            .getDataHome(2024)
            .then((res) => {
                if (res.message === 'success') {
                    console.log(res.data);
                    setData(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                            data: data?.dataSetChart?.slice(0, monthCurrent)?.map((item: any) => item.data.length),
                            borderColor: 'red',
                            fill: false,
                            cubicInterpolationMode: 'monotone',
                            tension: 0.4,
                        },
                        {
                            label: 'Số lượng người dùng',
                            data: data?.dataCustomers?.dataSetChart
                                ?.slice(0, monthCurrent)
                                ?.map((item: any) => item.data.length),
                            borderColor: 'blue',
                            fill: false,
                            cubicInterpolationMode: 'monotone',
                            tension: 0.4,
                        },
                        {
                            label: 'Số sản phẩm đang có',
                            data: data?.dataProducts?.dataSetChart
                                ?.slice(0, monthCurrent)
                                ?.map((item: any) => item.data.length),
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
    }, [data]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header-home')}>
                <CardHome
                    title="Đơn hàng hôm nay"
                    subTitle="Tiến triển tốt"
                    value={data?.totalOrdersaToday?.length ?? 0}
                    type="orders"
                    redirect="/"
                />
                <CardHome
                    title="Tổng số người dùng"
                    subTitle="Đang tăng vọt"
                    value={data?.totalCustomers ?? 0}
                    type="users"
                    redirect="/customers"
                />
                <CardHome
                    title="Tổng số sản phẩm"
                    subTitle="Nhiều hàng mới về"
                    value={data?.totalproducts ?? 0}
                    type="products"
                    redirect="/products"
                />
                <CardHome
                    title="Tổng số đơn hàng"
                    subTitle="Tăng vọt"
                    value={data?.totalOrders ?? 0}
                    type="ordered"
                    redirect="/"
                />
            </div>
            <div className={cx('popular-container')}>
                <h3>sản phẩm bán chạy nhất tuần</h3>
                <div className={cx('slider-popular-week')}>
                    <div>
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
                            {data?.dataSetWeek?.map((item: any) => {
                                return (
                                    <SwiperSlide>
                                        <div
                                            style={{
                                                backgroundImage: `url(${item.product_preview_url})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                            }}
                                            className={cx('item-popular')}
                                        ></div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                padding: '8px 24px',
                                            }}
                                            className={cx('info-popu')}
                                        >
                                            <h1
                                                style={{
                                                    fontSize: '20px',
                                                    color: '#fff',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                {item.product_name}
                                            </h1>
                                            <button
                                                style={{
                                                    border: 'none',
                                                    backgroundColor: 'orange',
                                                    color: '#fff',
                                                    cursor: 'pointer',
                                                    borderRadius: '4px',
                                                    padding: '10px 14px',
                                                    marginTop: '10px',
                                                }}
                                            >
                                                Xem thêm
                                            </button>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>
                </div>
            </div>
            <div className={cx('chart-statistical')}>
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    );
}

export default Home;
