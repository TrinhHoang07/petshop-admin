import { DefaultLayout } from '../components/Layout/DefaultLayout';
import { NoLayout } from '../components/Layout/NoLayout';
import routesConfig from '../config/routes';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { NotFound } from '../pages/NotFound';

type TRoutes = {
    id: number;
    path: string;
    component: Function;
    layout: Function;
};

const routes: TRoutes[] = [
    {
        id: 1,
        component: Home,
        layout: DefaultLayout,
        path: routesConfig.home,
    },
    {
        id: 2,
        component: Login,
        layout: NoLayout,
        path: routesConfig.login,
    },
    {
        id: 3,
        component: NotFound,
        layout: NoLayout,
        path: routesConfig.notFound,
    },
];

export { routes };
