import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
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
import styles from './CourseDetail.module.scss';
import { getCourseDetailsService } from '~/services';
import { convertBufferToBase64, formatPrice, secondsConvertHoursAndMinutesAndSeconds } from '~/utils/commonUtils';

const CourseDetail = () => {
    const { courseId } = useParams();

    const [courseDetail, setCourseDetail] = useState({});
    const [listActivePanel, setListActivePanel] = useState([]);

    useEffect(() => {
        let getCourseDetailFetch = async () => {
            try {
                let res = await getCourseDetailsService(courseId);
                if (!res?.errCode) {
                    let course = res?.data;
                    let chapterList = course.chapterList.map((chapter) => {
                        return {
                            chapterNumber: chapter?.chapterNumber,
                            title: chapter?.title,
                            numberOfLessons: chapter?.numberOfLessons,
                            lessonList: chapter?.lessonList?.map((lesson) => {
                                let time = secondsConvertHoursAndMinutesAndSeconds(lesson?.time);
                                return {
                                    name: lesson?.name,
                                    time: `${time?.m < 10 ? `0${time.m}` : `${time.m}`}:${
                                        time?.s < 10 ? `0${time.s}` : `${time.s}`
                                    }`,
                                    link: lesson?.video,
                                };
                            }),
                        };
                    });
                    let time = secondsConvertHoursAndMinutesAndSeconds(course?.time);
                    setCourseDetail({
                        name: course?.name,
                        img: convertBufferToBase64(course?.img),
                        author: {
                            img: convertBufferToBase64(course?.author?.picture),
                            name: `${course?.author?.familyName} ${course?.author?.givenName}`,
                        },
                        description: course?.description,
                        level: course?.level === 1 ? 'Cơ bản' : 'Nâng cao',
                        price: course?.price,
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

        getCourseDetailFetch();
    }, [courseId]);

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
        if (listActivePanel?.length === courseDetail?.chapterList?.length) {
            setListActivePanel([]);
        } else {
            setListActivePanel([...Array(courseDetail?.chapterList?.length).keys()]);
        }
    };

    return (
        <Container className={clsx(styles['wrapper'])}>
            <div className={clsx(styles['overview'])}>
                {courseDetail?.img && (
                    <div className={clsx(styles['course-image-wrapper'])}>
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
                    <p className={clsx(styles['course-rated'])}>
                        {courseDetail?.rate} stars {courseDetail?.numberOfParticipants} học viên
                    </p>
                </div>
                <div className={clsx(styles['buy-course-wrapper'])}>
                    <p className={clsx(styles['course-price'])}>{formatPrice(courseDetail?.price, 'VND')}</p>
                    <Link className={clsx('btn', styles['button-buy'])} size="lg">
                        Mua khoá học {'>'}
                    </Link>
                </div>
            </div>
            <div className={clsx(styles['special'])}>
                <div className={clsx(styles['special-item'])}>
                    <span className={clsx(styles['special-item-title'])}>
                        <FontAwesomeIcon icon={faGaugeHigh} />
                        <span>Trình độ</span>
                    </span>
                    <span className={clsx(styles['special-item-content'])}>{courseDetail?.level}</span>
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
                    <div onClick={handleExpandAll} className={clsx(styles['curriculum-of-course-toggle-btn'])}>
                        {listActivePanel?.length === courseDetail?.chapterList?.length
                            ? 'Thu gọn tất cả'
                            : 'Mở rộng tất cả'}
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
                                            {chapter.lessonList?.map((lesson, index) => {
                                                return (
                                                    <li key={`lesson-${index}`}>
                                                        <Link to="" className={clsx(styles['lesson-name'])}>
                                                            <FontAwesomeIcon icon={faCirclePlay} /> {lesson?.name}
                                                        </Link>
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
        </Container>
    );
};

export default CourseDetail;
