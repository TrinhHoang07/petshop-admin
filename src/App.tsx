import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from './routes';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {routes.map((route) => {
                    const Layout = route.layout;
                    const Page = route.component;

                    return (
                        <Route
                            key={route.id}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
