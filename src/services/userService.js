import axios from '~/utils/axios';

export const createAccountService = async (userInfo) => {
    return axios.post('/user/create', userInfo);
};

export const registerTeacherService = async (userId) => {
    return axios.patch('/user/is_teacher', { id: userId });
};
