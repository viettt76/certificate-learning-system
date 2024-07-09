import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import _ from 'lodash';
import { faAngleDown, faAngleUp, faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import YouTube from 'react-youtube';
import { getCourseDetailsService, getLessonVideoService } from '~/services';
import styles from './WatchLesson.module.scss';
import { convertBufferToBase64, formatPrice, secondsConvertHoursAndMinutesAndSeconds } from '~/utils/commonUtils';

const WatchLesson = () => {
    const { courseId, chapterId, lessonId } = useParams();

    const [courseDetail, setCourseDetail] = useState();
    const [lessonInfo, setLessonInfo] = useState({});
    const [listActivePanel, setListActivePanel] = useState([]);

    const opts = {
        width: '853',
        height: '480',
        playerVars: {
            autoplay: 1,
        },
    };

    useEffect(() => {
        const fetchGetCourseDetailsAndLessonVideo = async () => {
            try {
                const resCourse = await getCourseDetailsService(courseId);
                if (!resCourse?.errCode) {
                    const course = resCourse?.data;
                    const chapterList = course?.chapterList?.map((chapter) => {
                        return {
                            chapterId: chapter?.chapterId,
                            chapterNumber: chapter?.chapterNumber,
                            title: chapter?.title,
                            numberOfLessons: chapter?.numberOfLessons,
                            lessonList: chapter?.lessonList?.map((lesson) => {
                                const time = secondsConvertHoursAndMinutesAndSeconds(lesson?.time);
                                return {
                                    lessonId: lesson?.id,
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
                        level: course?.level === 1 ? 'Cơ bản' : 'Nâng cao',
                        price: formatPrice(course?.price, 'VND'),
                        rate: course?.rate,
                        numberOfParticipants: course?.numberOfParticipants,
                        numberOfLessons: course?.numberOfLessons,
                        time: `${time?.h} giờ ${time?.m} phút`,
                        chapterList,
                    });
                }

                const resLesson = await getLessonVideoService(lessonId);
                setLessonInfo({
                    ...resLesson?.data,
                    video: getId(resLesson?.data?.video),
                });
            } catch (error) {
                console.log(error);
            }
        };

        fetchGetCourseDetailsAndLessonVideo();
    }, [courseId, chapterId, lessonId]);

    function getId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);

        return match && match[2]?.length === 11 ? match[2] : null;
    }

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

    return (
        <div className="d-flex ps-3 pe-3">
            <div>
                <YouTube videoId={lessonInfo?.video} opts={opts} />;
            </div>
            <div className="ms-3 w-100">
                <h2 className="text-center mt-3 mb-3 fw-bold">{courseDetail?.name}</h2>
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
                                                        <Link
                                                            className="me-3"
                                                            to={`/course/${courseId}/${chapter?.id}/${lesson?.lessonId}`}
                                                        >
                                                            <FontAwesomeIcon icon={faCirclePlay} />{' '}
                                                            <span className="fz-16">{lesson?.name}</span>
                                                        </Link>
                                                        <div>{lesson?.time}</div>
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
        </div>
    );
};

export default WatchLesson;
