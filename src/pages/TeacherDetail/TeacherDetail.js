import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfStroke } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import styles from './TeacherDetail.module.scss';
import { getTeacherInfoService } from '~/services';
import { convertBufferToBase64, formatPrice } from '~/utils/commonUtils';

const TeacherDetail = () => {
    const { id } = useParams();

    const [teacherInfo, setTeacherInfo] = useState({});

    useEffect(() => {
        const getTeacherInfo = async () => {
            try {
                const res = await getTeacherInfoService(id);
                setTeacherInfo(res?.data);
            } catch (error) {
                console.log(error);
            }
        };

        getTeacherInfo();
    }, [id]);

    return (
        <div className={clsx(styles['wrapper'])}>
            <div className={clsx(styles['profile'])}>
                <div className={clsx(styles['label'])}>Giảng viên</div>
                <h5 className={clsx(styles['author-name'])}>
                    {teacherInfo?.familyName} {teacherInfo?.givenName}
                </h5>
                <p className={clsx(styles['author-description'])}>{teacherInfo?.job}</p>
                <ul className={clsx(styles['additional-info'])}>
                    <li className={clsx(styles['additional-info-item'])}>
                        <span className={clsx(styles['additional-info-item-title'])}>Tổng học viên</span>
                        <span className={clsx(styles['additional-info-item-parameter'])}>
                            {teacherInfo?.totalParticipants}
                        </span>
                    </li>
                    <li className={clsx(styles['additional-info-item'])}>
                        <span className={clsx(styles['additional-info-item-title'])}>Đánh giá</span>
                        <span className={clsx(styles['additional-info-item-parameter'])}>
                            {teacherInfo?.totalReviews}
                        </span>
                    </li>
                </ul>
                <div className={clsx(styles['introducing-me'])}>
                    <span className={clsx(styles['introducing-me-title'])}>Giới thiệu về tôi</span>
                    <p
                        className={clsx(styles['introducing-me-content'])}
                        dangerouslySetInnerHTML={{ __html: teacherInfo?.introduction }}
                    ></p>
                </div>
                <div className={clsx(styles['my-course-list'])}>
                    <span className={clsx(styles['my-course-list-title'])}>
                        Các khoá học của tôi ({teacherInfo?.courseList?.length})
                    </span>
                    <div className={clsx(styles['my-course-list-wrap'])}>
                        {teacherInfo?.courseList?.map((course) => {
                            return (
                                <Link
                                    key={`course-${course?.id}`}
                                    to={`/course/${course?.id}`}
                                    className={clsx(styles['my-course-list-item'])}
                                >
                                    <img
                                        className={clsx(styles['my-course-list-item-img'])}
                                        alt=""
                                        src={convertBufferToBase64(course?.img || '')}
                                    />
                                    <h3 className={clsx(styles['course-name'])}>{course?.name}</h3>
                                    <span className={clsx(styles['my-course-list-item-author'])}>
                                        {teacherInfo?.familyName} {teacherInfo?.givenName}
                                    </span>
                                    <div className={clsx(styles['my-course-list-item-rate'])}>
                                        {course?.rated}{' '}
                                        <span className={clsx(styles['stars'])}>
                                            {[...Array(Math.floor(course?.rated))]?.map((x, index) => {
                                                return (
                                                    <FontAwesomeIcon key={`star-solid-${index}`} icon={faStarSolid} />
                                                );
                                            })}
                                            {course?.rated > Math.floor(course?.rated) && (
                                                <FontAwesomeIcon icon={faStarHalfStroke} />
                                            )}
                                            {[...Array(5 - Math.round(course?.rated))]?.map((x, index) => {
                                                return <FontAwesomeIcon key={`star-regular-${index}`} icon={faStar} />;
                                            })}
                                        </span>
                                    </div>
                                    <ul className={clsx(styles['my-course-list-item-overview'])}>
                                        <li>Tổng số 6 giờ</li>
                                        <li>●</li>
                                        <li>35 bài giảng</li>
                                        <li>●</li>
                                        <li>{course?.level === 1 ? 'Cơ bản' : 'Nâng cao'}</li>
                                    </ul>
                                    <div className={clsx(styles['my-course-list-item-price'])}>
                                        <span>{formatPrice(course?.price, 'VND')}</span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div>
                <img
                    className={clsx(styles['author-img'])}
                    alt={`${teacherInfo?.familyName} ${teacherInfo?.givenName}`}
                    src={convertBufferToBase64(teacherInfo?.picture)}
                />
            </div>
        </div>
    );
};

export default TeacherDetail;
