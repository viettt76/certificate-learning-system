import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getPersonalInfoService, registerTeacherService } from '~/services';
import { customToast } from '~/utils/commonUtils';

const RegisterAsATeacher = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        if (!!userInfo?.isTeacher) {
            navigate('/instructor/courses');
        }
    }, [userInfo, navigate]);

    console.log(userInfo);
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                let res = await getPersonalInfoService();
                if (!res?.errCode) {
                    setUserInfo(res?.data);
                } else {
                    setUserInfo(null);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserInfo();
    }, []);

    const handleRegisterAsATeacher = async () => {
        try {
            let res = await registerTeacherService(userInfo?.id);
            if (!res?.errCode) {
                customToast('success', 'Register as a teacher successfully!');
            } else {
                customToast('error', 'Register as a teacher failed!');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Link
            className="d-block mt-4 display-6 text-center"
            to="/instructor/courses"
            onClick={handleRegisterAsATeacher}
        >
            Đồng ý làm giáo viên
        </Link>
    );
};

export default RegisterAsATeacher;
