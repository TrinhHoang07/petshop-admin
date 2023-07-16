import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSessionContext } from '../../contexts/SessionContext';
import routesConfig from '../../config/routes';

type T_Props = {
    component: () => JSX.Element;
};

function PrivateRoute(props: T_Props) {
    const [, setValues] = useSessionContext();
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState<boolean>(false);

    useEffect(() => {
        const user: any = localStorage.getItem('admin');
        if (user) {
            const data = JSON.parse(user);
            if (data) {
                setValues({
                    isAuth: true,
                    admin: {
                        name: data.name,
                        token: data.password,
                    },
                });
                setIsAuth(true);
            }
        } else {
            navigate(routesConfig.login);
            setIsAuth(false);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <>{isAuth && <props.component />}</>;
}

export default PrivateRoute;
