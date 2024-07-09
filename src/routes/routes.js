import LayoutOnlyHeader from '~/layouts/LayoutOnlyHeader';
import LayoutHeaderAndFooter from '~/layouts/LayoutHeaderAndFooter';
import LayoutTeacher from '~/layouts/LayoutTeacher';

import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Roadmap from '~/pages/Roadmap';

import CourseDetail from '~/pages/CourseDetail';
import PostCourse from '~/pages/PostCourse';
import CourseManage from '~/pages/CourseManage';
import PurchaseCourse from '~/pages/PurchaseCourse';
import TeacherDetail from '~/pages/TeacherDetail';

import RegisterAsATeacher from '~/pages/RegisterAsATeacher';
import InstructorCourses from '~/pages/InstructorCourses';

import WatchLesson from '~/pages/WatchLesson';

import NotFound from '~/pages/NotFound';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login, layout: LayoutOnlyHeader },
    { path: '/roadmap', component: Roadmap },
    { path: '/course/:courseId', component: CourseDetail },
    { path: '/course/:courseId/manage', component: CourseManage, layout: LayoutTeacher },
    { path: '/course/:courseId/purchase', component: PurchaseCourse, layout: LayoutOnlyHeader },
    { path: '/course/:courseId/:chapterId/:lessonId', component: WatchLesson, layout: LayoutOnlyHeader },
    { path: '/teacher/:id', component: TeacherDetail, layout: LayoutHeaderAndFooter },
    { path: '/teaching/teach-header', component: RegisterAsATeacher, layout: LayoutOnlyHeader },
    { path: '/instructor/courses', component: InstructorCourses, layout: LayoutTeacher },
    { path: '/instructor/courses/post', component: PostCourse, layout: LayoutTeacher },
    { path: '*', component: NotFound, layout: null },
];

export { publicRoutes };
