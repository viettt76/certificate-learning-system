import axios from '~/utils/axios';

export const loginService = (userInfo) => {
    return axios.post('/user/login', userInfo, { withCredentials: true });
};

export const logoutService = () => {
    return axios.post('user/logout', {}, { withCredentials: true });
};

export const verifyTokenService = () => {
    return axios.post('/user/verify-token', {}, { withCredentials: true });
};

export const getPersonalInfoService = () => {
    return axios.get('/user/personal-info', { withCredentials: true });
};

export const registerTeacherService = (teacherInfo) => {
    return axios.patch('/user/is_teacher', teacherInfo);
};

export const searchTeacherService = (keyword) => {
    return axios.get('/user/teacher/search', { params: { keyword } });
};

export const getTeacherInfoService = (id) => {
    return axios.get('/user/teacher/detail', { params: { id } });
};
