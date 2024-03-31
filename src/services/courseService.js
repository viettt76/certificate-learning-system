import axios from '~/utils/axios';

export const getAllCourseService = () => {
    return axios.get('/course/all');
};

export const getDetailCourseService = (id) => {
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
