import { useEffect, useState } from 'react';
import _ from 'lodash';
import clsx from 'clsx';
import Slide from '~/components/Slide';
import styles from './Home.module.scss';
import GroupCourses from '~/components/GroupCourses';
import { getAllCourseService } from '~/services';
import { convertBufferToBase64, secondsConvertHoursAndMinutesAndSeconds } from '~/utils/commonUtils';

const Home = () => {
    const [listOfFreeCourse, setListOfFreeCourse] = useState([]);
    const [listOfOutstandingCourse, setListOfOutstandingCourse] = useState([]);

    const formatCourseList = (courseList) => {
        return courseList.map((course) => {
            const { h, m, s } = secondsConvertHoursAndMinutesAndSeconds(course?.time);
            return {
                id: course?.id,
                name: course?.name,
                img: convertBufferToBase64(course?.img || ''),
                authorId: course?.authorInfo?.id,
                imgAuthor: convertBufferToBase64(course?.authorInfo?.picture || ''),
                nameAuthor: `${course?.authorInfo?.familyName} ${course?.authorInfo?.givenName}`,
                time: h > 0 ? `${h} giờ ${m} phút` : `${m} phút ${s} giây`,
                price: course?.price,
            };
        });
    };

    useEffect(() => {
        const getAllCourseFetch = async () => {
            try {
                const res = await getAllCourseService();
                if (!res?.errCode) {
                    const courseList = _.cloneDeep(res?.data);

                    const freeList = courseList.filter((course) => Number(course?.price) === 0);
                    setListOfFreeCourse(formatCourseList(freeList));

                    const outstandingList = _.orderBy(courseList, 'rate', 'desc').slice(0, 10);
                    setListOfOutstandingCourse(formatCourseList(outstandingList));
                }
            } catch (error) {
                console.log(error);
            }
        };
        getAllCourseFetch();
    }, []);

    return (
        <div className={clsx(styles['wrapper'])}>
            <Slide />
            <GroupCourses
                className={clsx(styles['group-courses'])}
                title="Khoá học miễn phí"
                groupCourses={listOfFreeCourse}
            />
            <GroupCourses
                className={clsx(styles['group-courses'])}
                title="Khoá học nổi bật"
                groupCourses={listOfOutstandingCourse}
            />
        </div>
    );
};

export default Home;
