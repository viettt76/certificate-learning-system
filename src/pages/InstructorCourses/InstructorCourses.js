import _ from 'lodash';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import GroupCourses from '~/components/GroupCourses';
import { getCourseTeachingService, getPersonalInfoService } from '~/services';
import { convertBufferToBase64 } from '~/utils/commonUtils';
import styles from './InstructorCourses.module.scss';

const InstructorCourses = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [courseList, setCourseList] = useState([]);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const res = await getPersonalInfoService();
                if (!res?.errCode) {
                    setUserInfo(res?.data);
                } else {
                    setUserInfo(null);
                }
            } catch (error) {
                console.log(error);
                setUserInfo(null);
            }
        };

        fetchUserInfo();
    }, []);

    useEffect(() => {
        const getCourseListFetch = async () => {
            try {
                if (userInfo?.id) {
                    const res = await getCourseTeachingService(userInfo.id);
                    if (!res?.errCode) {
                        const clone = _.cloneDeep(res.data).map((course) => {
                            return {
                                ...course,
                                img: convertBufferToBase64(course?.img || ''),
                                imgAuthor: convertBufferToBase64(userInfo?.picture || ''),
                                nameAuthor: `${userInfo?.familyName} ${userInfo?.givenName}`,
                            };
                        });
                        setCourseList(clone);
                    } else {
                        setCourseList([]);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };
        getCourseListFetch();
    }, [userInfo]);

    return (
        <Container>
            <div className={clsx(styles['post-course-wrapper'])}>
                <Link className={clsx('btn btn-lg btn-primary mt-3 mb-3 float-left', styles['post'])} to="post">
                    Đăng khoá học
                </Link>
            </div>

            {courseList?.length > 0 ? (
                <GroupCourses groupCourses={courseList} isTeacher={true} />
            ) : (
                <div className={clsx('text-center fz-16 mt-3')}>Bạn chưa đăng khoá học nào.</div>
            )}
        </Container>
    );
};

export default InstructorCourses;
