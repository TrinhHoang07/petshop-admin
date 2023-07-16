import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import { PrivateRoute } from './components/PrivateRoute';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {routes.map((route) => {
                    const Layout = route.layout as any;
                    const Page = route.component as any;

                    return (
                        <Route
                            key={route.id}
                            path={route.path}
                            element={<Layout>{route.protect ? <PrivateRoute component={Page} /> : <Page />}</Layout>}
                        />
                    );
                })}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
