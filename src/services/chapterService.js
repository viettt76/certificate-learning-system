import axios from '~/utils/axios';

export const postChapterService = (data) => {
    return axios.post('/chapter/post', data);
};
