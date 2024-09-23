import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import logo from '../../assets/images/logo-petshop.jpg';
import { useLocation, useNavigate } from 'react-router-dom';
import routesConfig from '../../config/routes';
import { useEffect, useRef, useState } from 'react';
import { useSessionContext } from '../../contexts/SessionContext';
import { ApiService } from '../../axios/ApiService';

const cx = classNames.bind(styles);

type TForm = {
    name: string;
    password: string;
};

type TStateRedirect = {
    redirect: string;
};

function Login() {
    const nameRef = useRef<any>();
    const passwordRef = useRef<any>();
    const [error, setError] = useState<boolean>(false);
    const navigate = useNavigate();
    const apiService = new ApiService();
    const { state }: { state: TStateRedirect } = useLocation();
    const [, setStateContext] = useSessionContext();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TForm>();

    const onSubmit: SubmitHandler<TForm> = (data: TForm) => {
        const dataUser = {
            username: data.name,
            password: data.password,
        };

        apiService.auth
            .login(dataUser)
            .then((res) => {
                if (res.message === 'success') {
                    console.log('res: ', res);
                    localStorage.setItem('admin', JSON.stringify(dataUser));
                    setStateContext({
                        isAuth: true,
                        admin: {
                            name: data.name,
                        },
                    });

                    if (state) {
                        navigate(state.redirect);
                    } else {
                        navigate(routesConfig.home);
                    }
                }
            })
            .catch((err) => {
                setError(true);
                handleErrorInput(nameRef.current);
                handleErrorInput(passwordRef.current);
            });
    };

    const handleErrorInput = (ele: HTMLInputElement) => {
        if (ele) {
            ele.style.border = '1px solid red';
        }
    };

    const handleClearErrorInput = (ele: HTMLInputElement) => {
        if (ele) {
            ele.style.border = '1px solid dodgerblue';
        }
    };

    const handleFocus = (ele: HTMLInputElement) => {
        if (ele) {
            ele.style.border = '1px solid dodgerblue';
        }
    };

    const handleBlur = (ele: HTMLInputElement) => {
        if (ele) {
            ele.style.border = '1px solid #d7d7d7';
        }
    };

    useEffect(() => {
        if (errors.name?.ref) {
            nameRef.current = errors.name.ref;
            handleErrorInput(errors.name.ref as HTMLInputElement);
        } else {
            if (nameRef.current) {
                handleClearErrorInput(nameRef.current);
            }
        }

        if (errors.password?.ref) {
            passwordRef.current = errors.password.ref;
            handleErrorInput(errors.password.ref as HTMLInputElement);
        } else {
            if (passwordRef.current) {
                handleClearErrorInput(passwordRef.current);
            }
        }
    }, [errors.name, errors.password]);

    return (
        <div className={cx('login')}>
            <div className={cx('contents')}>
                <div className={cx('logo')}>
                    <img src={logo} alt="logo shop" />
                </div>
                <div className={cx('heading')}>
                    <h3>Sign in to PetShop</h3>
                    <p>Hãy nhập thông tin tài khoản và mật khẩu của bạn</p>
                </div>
                <div className={cx('login-form')}>
                    <form onSubmit={handleSubmit(onSubmit)} className={cx('form-container')}>
                        <div className={cx('form-item')}>
                            <label htmlFor="name">Tài khoản: </label>
                            <input
                                id="name"
                                type="text"
                                {...register('name', { required: true, minLength: 1 })}
                                placeholder="Your name..."
                                onInput={(e) => handleFocus(e.target as HTMLInputElement)}
                                onBlur={(e) => handleBlur(e.target)}
                            />
                            {errors.name && <p className={cx('error-field')}>This field is required!</p>}
                        </div>
                        <div className={cx('form-item')}>
                            <label htmlFor="password">Mật khẩu: </label>
                            <input
                                id="password"
                                type="text"
                                {...register('password', {
                                    required: true,
                                })}
                                placeholder="Password..."
                                onInput={(e) => handleFocus(e.target as HTMLInputElement)}
                                onBlur={(e) => handleBlur(e.target)}
                            />
                            {errors.password && <p className={cx('error-field')}>This field is required!</p>}
                            {error && <p className={cx('error-field')}>Tên tài khoản hoặc mật khẩu không chính xác!</p>}
                        </div>
                        <div className={cx('form-submit')}>
                            <button type="submit">ĐĂNG NHẬP</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
