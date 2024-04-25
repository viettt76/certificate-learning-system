import axios from '~/utils/axios';

export const postLessonService = (data) => {
    return axios.post('/lesson/post', data);
};

export const getLessonVideoService = (id) => {
    return axios.get('/lesson/video', {
        params: { id },
    });
};
