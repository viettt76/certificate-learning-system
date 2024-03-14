import { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/index.scss';
import { publicRoutes } from './routes/routes';
import LayoutDefault from './layouts/LayoutDefault';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.component;
                    let Layout = LayoutDefault;
                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = Fragment;
                    }
                    return (
                        <Route
                            key={`route-${index}`}
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
};

export default App;
