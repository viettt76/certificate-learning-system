import LayoutOnlyHeader from '~/layouts/LayoutOnlyHeader';
import DetailCourse from '~/pages/DetailCourse';
import Home from '~/pages/Home';
import InstructorCourses from '~/pages/InstructorCourses';
import Login from '~/pages/Login';
import PostCourse from '~/pages/PostCourse';
import Roadmap from '~/pages/Roadmap';
import TeachHeader from '~/pages/TeachHeader';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login, layout: LayoutOnlyHeader },
    { path: '/roadmap', component: Roadmap },
    { path: '/course/:courseId', component: DetailCourse },
    { path: '/teaching/teach-header', component: TeachHeader, layout: LayoutOnlyHeader },
    { path: '/instructor/courses', component: InstructorCourses, layout: LayoutOnlyHeader },
    { path: '/instructor/courses/post', component: PostCourse, layout: LayoutOnlyHeader },
];

export { publicRoutes };
