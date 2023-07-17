import { DefaultLayout } from '../components/Layout/DefaultLayout';
import { NoLayout } from '../components/Layout/NoLayout';
import routesConfig from '../config/routes';
import { Chat } from '../pages/Chat';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { NotFound } from '../pages/NotFound';

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
        id: 4,
        component: Chat,
        layout: DefaultLayout,
        path: routesConfig.chat,
        protect: true,
    },
    {
        id: 2,
        component: Login,
        layout: NoLayout,
        path: routesConfig.login,
        protect: false,
    },
    {
        id: 3,
        component: NotFound,
        layout: NoLayout,
        path: routesConfig.notFound,
        protect: false,
    },
];

export { routes };
