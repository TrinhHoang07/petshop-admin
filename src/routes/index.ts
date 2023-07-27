import { DefaultLayout } from '../components/Layout/DefaultLayout';
import { NoLayout } from '../components/Layout/NoLayout';
import routesConfig from '../config/routes';
import { Chat } from '../pages/Chat';
import { Customers } from '../pages/Customers';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { NotFound } from '../pages/NotFound';
import { Products } from '../pages/Products';

type TRoutes = {
    id: number;
    path: string;
    component: Function;
    layout: Function;
    protect: boolean;
};

const routes: TRoutes[] = [
    {
        id: 1,
        component: Home,
        layout: DefaultLayout,
        path: routesConfig.home,
        protect: true,
    },
    {
        id: 2,
        component: Chat,
        layout: DefaultLayout,
        path: routesConfig.chat,
        protect: true,
    },
    {
        id: 3,
        component: Login,
        layout: NoLayout,
        path: routesConfig.login,
        protect: false,
    },
    {
        id: 4,
        component: Products,
        layout: DefaultLayout,
        path: routesConfig.products,
        protect: true,
    },
    {
        id: 5,
        component: Customers,
        layout: DefaultLayout,
        path: routesConfig.customers,
        protect: true,
    },
    {
        id: 100,
        component: NotFound,
        layout: NoLayout,
        path: routesConfig.notFound,
        protect: false,
    },
];

export { routes };
