import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Slide from '~/components/Slide';
import styles from './Home.module.scss';
import GroupCourses from '~/components/GroupCourses';
import { getAllCourseService } from '~/services/courseService';
import _ from 'lodash';
import { convertBufferToBase64 } from '~/utils/commonUtils';

const Home = () => {
    const [courseList, setCourseList] = useState([]);

    useEffect(() => {
        const getAllCourseFetch = async () => {
            let res = await getAllCourseService();
            if (res?.errCode === 0) {
                let clone = _.cloneDeep(res?.data).map((course) => ({
                    id: course?.id,
                    name: course?.name,
                    img: convertBufferToBase64(course?.img || ''),
                    imgAuthor: convertBufferToBase64(course?.authorInfo?.picture || ''),
                    nameAuthor: `${course?.authorInfo?.familyName} ${course?.authorInfo?.givenName}`,
                    time: '56 phút 08 giây',
                    price: course?.price,
                }));
                setCourseList(clone);
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
                groupCourses={courseList}
            />
        </div>
    );
};

export default Home;
