import _ from 'lodash';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import GroupCourses from '~/components/GroupCourses';
import { getCourseTeachingService } from '~/services/courseService';
import { userInfoSelector } from '~/store/selectors';
import { convertBufferToBase64 } from '~/utils/commonUtils';

const InstructorCourses = () => {
    const userInfo = useSelector(userInfoSelector);
    const [courseList, setCourseList] = useState([]);

    useEffect(() => {
        const getCourseListFetch = async () => {
            let res = await getCourseTeachingService(userInfo?.id);
            if (res?.errCode === 0) {
                let clone = _.cloneDeep(res.data).map((course) => {
                    return {
                        ...course,
                        img: convertBufferToBase64(course?.img || ''),
                        imgAuthor: userInfo?.picture,
                        nameAuthor: `${userInfo?.familyName} ${userInfo?.givenName}`,
                    };
                });
                setCourseList(clone);
            } else {
                setCourseList([]);
            }
        };
        getCourseListFetch();
    }, [userInfo]);

    return (
        <Container>
            <Link className="btn btn-primary mt-3 mb-3 float-left" to="post">
                Đăng khoá học
            </Link>

            <GroupCourses groupCourses={courseList} isTeacher={true} />
        </Container>
    );
};

export default InstructorCourses;
