import axios from '~/utils/axios';

export const getAllCourseService = () => {
    return axios.get('/course/all');
};

export const getCourseDetailsService = (id) => {
    return axios.get('/course/detail', {
        params: { id },
    });
};

export const postCourseService = (courseInfo) => {
    return axios.post('/course/post', courseInfo);
};

export const getCourseTeachingService = (id) => {
    return axios.get('/course/teaching', {
        params: {
            id,
        },
    });
};

export const searchCourseService = (keyword) => {
    return axios.get('/course/search', {
        params: {
            keyword,
        },
    });
};

export const updateCourseInfoService = (data) => {
    return axios.put('/course/update-info', data);
};

export const postFavoriteCourseService = (courseId) => {
    return axios.post('/course/favorite/add', { courseId }, { withCredentials: true });
};

export const getFavoriteCourseListService = () => {
    return axios.get('/course/favorite', { withCredentials: true });
};

export const postCourseCartService = (courseId) => {
    return axios.post('/course/cart/add', { courseId }, { withCredentials: true });
};

export const getCourseCartService = () => {
    return axios.get('/course/cart', { withCredentials: true });
};

export const postPurchasedCourseService = (courseId) => {
    return axios.post('/course/purchased/add', { courseId }, { withCredentials: true });
};

export const getPurchasedCourseService = () => {
    return axios.get('/course/purchased', { withCredentials: true });
};
