import { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import {
    faAngleDown,
    faAngleUp,
    faCirclePlay,
    faGaugeHigh,
    faGraduationCap,
    faStopwatch,
} from '@fortawesome/free-solid-svg-icons';
import styles from './DetailCourse.module.scss';
import { getDetailCourseService } from '~/services/courseService';
import { convertBufferToBase64 } from '~/utils/commonUtils';

const DetailCourse = () => {
    const { courseId } = useParams();

    const [courseDetail, setCourseDetail] = useState({});

    useEffect(() => {
        let getDetailCourseFetch = async () => {
            let res = await getDetailCourseService(courseId);
            if (res?.errCode === 0) {
                let course = res?.data;
                let courseLevel = 'Cơ bản';
                if (course?.level === '2') {
                    courseLevel = 'Nâng cao';
                }
                setCourseDetail({
                    name: course?.name,
                    img: convertBufferToBase64(course?.img),
                    author: {
                        img: convertBufferToBase64(course?.authorInfo?.picture),
                        name: `${course?.authorInfo?.familyName} ${course?.authorInfo?.givenName}`,
                    },
                    description: course?.description,
                    level: courseLevel,
                    numberOfLessons: '12',
                    time: '03 giờ 26 phút',
                    curriculums: [
                        {
                            title: 'Giới thiệu về career paths trong lĩnh vực Cloud Computing & AWS',
                            numberOfLessons: '3',
                            panels: [
                                {
                                    name: 'Các câu hỏi thường gặp',
                                    time: '11:30',
                                    link: 'https://youtu.be/8NWmfkQJ9Sg?list=RD8NWmfkQJ9Sg',
                                },
                                {
                                    name: 'Giáo viên',
                                    time: '01:46',
                                    link: 'https://youtu.be/8NWmfkQJ9Sg?list=RD8NWmfkQJ9Sg',
                                },
                                {
                                    name: 'Giảng viên',
                                    time: '17:30',
                                    link: 'https://youtu.be/8NWmfkQJ9Sg?list=RD8NWmfkQJ9Sg',
                                },
                            ],
                        },
                        {
                            title: 'Global infrastructure của AWS, giới thiệu các services chính.',
                            numberOfLessons: '6',
                            panels: [
                                { name: 'Học', time: '05:08', link: 'https://youtu.be/8NWmfkQJ9Sg?list=RD8NWmfkQJ9Sg' },
                                { name: 'nữa', time: '09:34', link: 'https://youtu.be/8NWmfkQJ9Sg?list=RD8NWmfkQJ9Sg' },
                                { name: 'Mãi', time: '23:56', link: 'https://youtu.be/8NWmfkQJ9Sg?list=RD8NWmfkQJ9Sg' },
                            ],
                        },
                    ],
                });
            }
        };

        getDetailCourseFetch();
    }, [courseId]);

    const [listActivePanel, setListActivePanel] = useState([]);

    const handleClickPanel = (index) => {
        if (listActivePanel.includes(index)) {
            let i = listActivePanel.indexOf(index);
            let copyListActivePanel = _.clone(listActivePanel);
            copyListActivePanel.splice(i, 1);
            setListActivePanel([...copyListActivePanel]);
        } else {
            setListActivePanel([...listActivePanel, index]);
        }
    };

    const handleExpandAll = () => {
        if (listActivePanel?.length === courseDetail?.curriculums?.length) {
            setListActivePanel([]);
        } else {
            setListActivePanel([...Array(courseDetail?.curriculums?.length).keys()]);
        }
    };

    return (
        <Container className={clsx(styles['wrapper'])}>
            <div className={clsx(styles['overview'])}>
                {courseDetail?.img && (
                    <div>
                        <img
                            className={clsx(styles['course-image'])}
                            src={courseDetail?.img}
                            alt={courseDetail?.name}
                        />
                    </div>
                )}
                <div className={clsx(styles['course-info'])}>
                    <h3 className={clsx(styles['course-name'])}>{courseDetail?.name}</h3>
                    <div className={clsx(styles['course-author'])}>
                        <img
                            className={clsx(styles['author-image'])}
                            src={courseDetail?.author?.img}
                            alt={courseDetail?.author?.name}
                        />
                        <span className={clsx(styles['author-name'])}>{courseDetail?.author?.name}</span>
                    </div>
                    <p className={clsx(styles['course-description'])}>{courseDetail?.description}</p>
                </div>
                <div>
                    <Button className={clsx(styles['button-learn'])} size="lg">
                        Học miễn phí {'>'}
                    </Button>
                </div>
            </div>
            <div className={clsx(styles['special'])}>
                <div className={clsx(styles['special-item'])}>
                    <span className={clsx(styles['special-item-title'])}>
                        <FontAwesomeIcon icon={faGaugeHigh} />
                        <span>Trình độ</span>
                    </span>
                    <span>{courseDetail?.level}</span>
                </div>
                <div className={clsx(styles['special-item'])}>
                    <span className={clsx(styles['special-item-title'])}>
                        <FontAwesomeIcon icon={faGraduationCap} />
                        <span>Số bài học</span>
                    </span>
                    <span>{courseDetail?.numberOfLessons} bài học</span>
                </div>
                <div className={clsx(styles['special-item'])}>
                    <span className={clsx(styles['special-item-title'])}>
                        <FontAwesomeIcon icon={faStopwatch} />
                        <span>Thời lượng</span>
                    </span>
                    <span>{courseDetail?.time}</span>
                </div>
            </div>
            <div className={clsx(styles['curriculum-of-course'])}>
                <h2 className={clsx(styles['curriculum-of-course-header'])}>Nội dung khoá học</h2>
                <div className={clsx(styles['curriculum-of-course-subheader'])}>
                    <ul>
                        <li>
                            <strong>{courseDetail?.curriculums?.length}</strong> chương
                        </li>
                        <li>•</li>
                        <li>
                            <strong>{courseDetail?.numberOfLessons}</strong> bài học
                        </li>
                        <li>•</li>
                        <li>
                            Thời lượng <strong>{courseDetail?.time}</strong>
                        </li>
                    </ul>
                    <div onClick={handleExpandAll} className={clsx(styles['curriculum-of-course-toggle-btn'])}>
                        {listActivePanel?.length === courseDetail?.curriculums?.length
                            ? 'Thu gọn tất cả'
                            : 'Mở rộng tất cả'}
                    </div>
                </div>
                <ul className={clsx(styles['curriculum-of-course-curriculum-panel'])}>
                    {courseDetail?.curriculums?.map((curriculum, index) => {
                        return (
                            <li key={`panel-${index}`} className={clsx(styles['curriculum-of-course-panel'])}>
                                <div
                                    className={clsx(styles['curriculum-of-course-panel-title'])}
                                    onClick={() => handleClickPanel(index)}
                                >
                                    <div className={clsx(styles['curriculum-of-course-panel-title-float-left'])}>
                                        {listActivePanel.includes(index) ? (
                                            <FontAwesomeIcon icon={faAngleUp} />
                                        ) : (
                                            <FontAwesomeIcon icon={faAngleDown} />
                                        )}
                                        <h5>{curriculum?.title}</h5>
                                    </div>
                                    <span className={clsx(styles['curriculum-of-course-panel-title-float-right'])}>
                                        {curriculum?.numberOfLessons} bài học
                                    </span>
                                </div>
                                {listActivePanel.includes(index) ? (
                                    <div className={clsx(styles['curriculum-of-course-panel-collapse'])}>
                                        <ul>
                                            {curriculum?.panels?.map((panel, index) => {
                                                return (
                                                    <li key={`lesson-${index}`}>
                                                        <Link to="">
                                                            <FontAwesomeIcon icon={faCirclePlay} /> {panel?.name}
                                                        </Link>
                                                        <div>{panel?.time}</div>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </Container>
    );
};

export default DetailCourse;
