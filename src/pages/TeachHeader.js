import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerTeacherService } from '~/services';
import { registerTeacherSuccess } from '~/store/actions';
import { userInfoSelector } from '~/store/selectors';

const { Link, useNavigate } = require('react-router-dom');

const TeachHeader = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector(userInfoSelector);

    useEffect(() => {
        if (userInfo.isTeacher === 1) {
            navigate('/instructor/courses');
        }
    }, [userInfo, navigate]);

    const handleRegisterAsATeacher = async () => {
        let res = await registerTeacherService(userInfo?.id);
        if (res?.errCode === 0) {
            dispatch(registerTeacherSuccess());
        }
    };

    return (
        <Link to="/instructor/courses" onClick={handleRegisterAsATeacher}>
            Đồng ý làm giáo viên
        </Link>
    );
};

export default TeachHeader;
