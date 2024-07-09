import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
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
import styles from './CourseManage.module.scss';
import { getCourseDetailsService } from '~/services';
import { convertBufferToBase64, formatPrice, secondsConvertHoursAndMinutesAndSeconds } from '~/utils/commonUtils';
import ModalAddLesson from '~/components/ModalAddLesson';
import ModalUpdateCourseDetails from '~/components/ModalUpdateCourseDetails';

const CourseManage = () => {
    const { courseId } = useParams();
    const [courseDetail, setCourseDetail] = useState({});
    const [listActivePanel, setListActivePanel] = useState([]);
    const [showModalUpdateCourseDetails, setShowModalUpdateCourseDetails] = useState(false);
    const [showModalAddLesson, setShowModalAddLesson] = useState(false);

    useEffect(() => {
        const getDetailCourseFetch = async () => {
            try {
                const res = await getCourseDetailsService(courseId);
                if (!res?.errCode) {
                    const course = res?.data;
                    const chapterList = course?.chapterList?.map((chapter) => {
                        return {
                            chapterId: chapter?.id,
                            chapterNumber: chapter?.chapterNumber,
                            title: chapter?.title,
                            numberOfLessons: chapter?.numberOfLessons,
                            lessonList: chapter?.lessonList?.map((lesson) => {
                                const time = secondsConvertHoursAndMinutesAndSeconds(lesson?.time);
                                return {
                                    lessonId: lesson?.id,
                                    lessonNumber: lesson?.lessonNumber,
                                    name: lesson?.name,
                                    time: `${time?.m < 10 ? `0${time.m}` : `${time.m}`}:${
                                        time?.s < 10 ? `0${time.s}` : `${time.s}`
                                    }`,
                                    link: lesson?.video,
                                };
                            }),
                        };
                    });
                    const time = secondsConvertHoursAndMinutesAndSeconds(course?.time);
                    setCourseDetail({
                        name: course?.name,
                        img: convertBufferToBase64(course?.img),
                        author: {
                            img: convertBufferToBase64(course?.authorInfo?.picture),
                            name: `${course?.authorInfo?.familyName} ${course?.authorInfo?.givenName}`,
                        },
                        description: course?.description,
                        level: course?.level,
                        price: course?.price,
                        numberOfReviews: course?.numberOfReviews,
                        rate: course?.rate,
                        numberOfParticipants: course?.numberOfParticipants,
                        numberOfLessons: course?.numberOfLessons,
                        time: `${time?.h} giờ ${time?.m} phút`,
                        chapterList,
                    });
                }
            } catch (error) {
                console.log(error);
            }
        };

        getDetailCourseFetch();
    }, [courseId, showModalAddLesson, showModalUpdateCourseDetails]);

    const handleClickPanel = (index) => {
        if (listActivePanel.includes(index)) {
            const i = listActivePanel.indexOf(index);
            const copyListActivePanel = _.clone(listActivePanel);
            copyListActivePanel.splice(i, 1);
            setListActivePanel([...copyListActivePanel]);
        } else {
            setListActivePanel([...listActivePanel, index]);
        }
    };

    const handleExpandAll = () => {
        if (listActivePanel?.length === courseDetail?.chapterList?.length) {
            setListActivePanel([]);
        } else {
            setListActivePanel([...Array(courseDetail?.chapterList?.length).keys()]);
        }
    };

    return (
        <Container className="pt-3">
            <div className="d-flex">
                <div className={clsx(styles['course-overview'])}>
                    <div>
                        <h3 className={clsx(styles['course-name'])}>{courseDetail?.name}</h3>
                        <p className={clsx(styles['course-description'])}>{courseDetail?.description}</p>
                        <p className={clsx(styles['course-review'])}>
                            {courseDetail?.rate} star ({courseDetail?.numberOfReviews} lượt đánh giá){' '}
                            {courseDetail?.numberOfParticipants} học viên
                        </p>
                    </div>
                    <div className={clsx(styles['special'])}>
                        <div className={clsx(styles['special-item'])}>
                            <span className={clsx(styles['special-item-title'])}>
                                <FontAwesomeIcon icon={faGaugeHigh} />
                                <span>Trình độ</span>
                            </span>
                            <span className={clsx(styles['special-item-content'])}>
                                {courseDetail?.level === 1 ? 'Cơ bản' : 'Nâng cao'}
                            </span>
                        </div>
                        <div className={clsx(styles['special-item'])}>
                            <span className={clsx(styles['special-item-title'])}>
                                <FontAwesomeIcon icon={faGraduationCap} />
                                <span>Số bài học</span>
                            </span>
                            <span className={clsx(styles['special-item-content'])}>
                                {courseDetail?.numberOfLessons} bài học
                            </span>
                        </div>
                        <div className={clsx(styles['special-item'])}>
                            <span className={clsx(styles['special-item-title'])}>
                                <FontAwesomeIcon icon={faStopwatch} />
                                <span>Thời lượng</span>
                            </span>
                            <span className={clsx(styles['special-item-content'])}>{courseDetail?.time}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={clsx(styles['sidebar'])}>
                        <Link className={clsx(styles['sidebar-preview'])}>
                            <img
                                className={clsx(styles['sidebar-img'])}
                                alt={courseDetail?.name}
                                src={courseDetail?.img}
                            />
                            <span className={clsx(styles['sidebar-img-overlay'])}></span>
                        </Link>
                        <div className={clsx(styles['sidebar-price'])}>{formatPrice(courseDetail?.price, 'VND')}</div>
                    </div>
                </div>
                <div className={clsx(styles['btn-fix-wrapper'])}>
                    <button
                        className={clsx('btn btn-warning text-white ms-3', styles['btn-fix'])}
                        onClick={() => setShowModalUpdateCourseDetails(true)}
                    >
                        Sửa
                    </button>
                </div>
            </div>
            <div className={clsx(styles['curriculum-of-course'])}>
                <h2 className={clsx(styles['curriculum-of-course-header'])}>Nội dung khoá học</h2>
                <div className={clsx(styles['curriculum-of-course-subheader'])}>
                    <ul>
                        <li>
                            <strong>{courseDetail?.chapterList?.length}</strong> chương
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
                    <div className="d-flex">
                        <div
                            onClick={() => setShowModalAddLesson(true)}
                            className={clsx('me-3', styles['curriculum-of-course-add'])}
                        >
                            Thêm bài học
                        </div>
                        <div onClick={handleExpandAll} className={clsx(styles['curriculum-of-course-toggle-btn'])}>
                            {listActivePanel?.length === courseDetail?.chapterList?.length
                                ? 'Thu gọn tất cả'
                                : 'Mở rộng tất cả'}
                        </div>
                    </div>
                </div>
                <ul className={clsx(styles['curriculum-of-course-curriculum-panel'])}>
                    {courseDetail?.chapterList?.map((chapter, index) => {
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
                                        <h5>
                                            Chương {chapter?.chapterNumber}. {chapter?.title}
                                        </h5>
                                    </div>
                                    <span className={clsx(styles['curriculum-of-course-panel-title-float-right'])}>
                                        {chapter?.numberOfLessons} bài học
                                    </span>
                                </div>
                                {listActivePanel.includes(index) ? (
                                    <div className={clsx(styles['curriculum-of-course-panel-collapse'])}>
                                        <ul>
                                            {chapter?.lessonList?.map((lesson, index) => {
                                                return (
                                                    <li key={`lesson-${index}`}>
                                                        <div>
                                                            <span className="fz-16 ">{lesson?.lessonNumber}. </span>
                                                            <Link
                                                                to={`/course/${courseId}/${chapter?.chapterId}/${lesson?.lessonId}`}
                                                                className={clsx(styles['lesson-name'])}
                                                            >
                                                                <FontAwesomeIcon icon={faCirclePlay} /> {lesson?.name}
                                                            </Link>
                                                        </div>
                                                        <div className={clsx(styles['lesson-time'])}>
                                                            {lesson?.time}
                                                        </div>
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
            <ModalUpdateCourseDetails
                id={courseId}
                name={courseDetail?.name}
                img={courseDetail?.img}
                description={courseDetail?.description}
                level={courseDetail?.level}
                price={courseDetail?.price}
                chapterList={courseDetail?.chapterList}
                show={showModalUpdateCourseDetails}
                setShow={setShowModalUpdateCourseDetails}
            />
            <ModalAddLesson
                courseId={courseId}
                nameCourse={courseDetail?.name}
                chapterList={courseDetail?.chapterList}
                show={showModalAddLesson}
                setShow={setShowModalAddLesson}
            />
        </Container>
    );
};

export default CourseManage;
