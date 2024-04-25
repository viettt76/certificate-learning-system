import axios from '~/utils/axios';

export const loginService = (userInfo) => {
    return axios.post('/user/login', userInfo, { withCredentials: true });
};

export const logoutService = () => {
    axios.defaults.withCredentials = true;
    return axios.post('user/logout');
};

export const getPersonalInfoService = () => {
    return axios.get('/user/personal-info', { withCredentials: true });
};

export const registerTeacherService = (id) => {
    return axios.patch('/user/is_teacher', { id });
};

export const searchTeacherService = (keyword) => {
    return axios.get('/user/teacher/search', { params: { keyword } });
};

export const getTeacherInfoService = (id) => {
    return axios.get('/user/teacher/detail', { params: { id } });
};
