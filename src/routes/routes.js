import LayoutOnlyHeader from '~/layouts/LayoutOnlyHeader';
import DetailCourse from '~/pages/DetailCourse';
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Roadmap from '~/pages/Roadmap';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/register', component: Register, layout: LayoutOnlyHeader },
    { path: '/login', component: Login, layout: LayoutOnlyHeader },
    { path: '/roadmap', component: Roadmap },
    { path: '/detail', component: DetailCourse },
];

export { publicRoutes };
