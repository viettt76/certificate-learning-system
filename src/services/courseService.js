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
