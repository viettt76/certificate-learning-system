import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import styles from './NoticeOfCourseList.module.scss';
import { useEffect, useRef, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getCourseCartService, getFavoriteCourseListService, getPurchasedCourseService } from '~/services';
import { convertBufferToBase64, formatPrice } from '~/utils/commonUtils';

const NoticeOfCourseList = ({ title, type, icon, textWhenEmpty, textLinkWhenEmpty, linkWhenEmpty }) => {
    const [courseListState, setCourseListState] = useState([]);
    const [showCourseList, setShowCourseList] = useState(false);

    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setShowCourseList(false);
        }
    };

    useEffect(() => {
        const fetchCourseList = async () => {
            try {
                let res, clone;
                switch (type) {
                    case 'favorites':
                        res = await getFavoriteCourseListService();
                        if (!res?.errCode) {
                            clone = res?.data?.map((course) => {
                                return {
                                    id: course?.courseId,
                                    name: course?.likedCourseInfo?.name,
                                    img: course?.likedCourseInfo?.img,
                                    price: course?.likedCourseInfo?.price,
                                };
                            });
                        }
                        break;
                    case 'cart':
                        res = await getCourseCartService();
                        if (!res?.errCode) {
                            clone = res?.data?.map((course) => {
                                return {
                                    id: course?.courseId,
                                    name: course?.courseCartInfo?.name,
                                    img: course?.courseCartInfo?.img,
                                    price: course?.courseCartInfo?.price,
                                };
                            });
                        }
                        break;
                    case 'studying':
                        res = await getPurchasedCourseService();
                        if (!res?.errCode) {
                            clone = res?.data?.map((course) => {
                                return {
                                    id: course?.courseId,
                                    name: course?.purchasedCourseInfo?.name,
                                    img: course?.purchasedCourseInfo?.img,
                                    price: course?.purchasedCourseInfo?.price,
                                };
                            });
                        }
                        break;
                    default:
                        throw Error('Error from server');
                }
                setCourseListState(clone);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCourseList();
    }, [type, showCourseList]);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return (
        <div ref={ref} className={clsx(styles['wrapper'])}>
            <FontAwesomeIcon
                onClick={() => setShowCourseList(!showCourseList)}
                className={clsx(styles['icon'])}
                icon={icon}
            />
            {courseListState?.length > 0 ? (
                <div>
                    <ListGroup
                        className={clsx(styles['group-courses'], {
                            [styles['show-group-courses']]: showCourseList,
                        })}
                    >
                        <h5 className={clsx(styles['title'])}>{title}</h5>
                        {courseListState.map((item, index) => {
                            return (
                                <ListGroup.Item key={`course-${index}`}>
                                    <Link className={clsx(styles['course'])} to={`/course/${item?.id}`}>
                                        <img
                                            className={clsx(styles['course-img'])}
                                            src={convertBufferToBase64(item?.img)}
                                            alt={item?.name}
                                        />
                                        <div>
                                            <h5 className={clsx(styles['course-name'])}>{item?.name}</h5>
                                            <span className={clsx(styles['course-price'])}>
                                                {formatPrice(item?.price, 'VND')}
                                            </span>
                                        </div>
                                    </Link>
                                </ListGroup.Item>
                            );
                        })}
                    </ListGroup>
                </div>
            ) : (
                <div
                    className={clsx(styles['group-courses'], styles['group-courses-empty'], {
                        [styles['show-group-courses']]: showCourseList,
                    })}
                >
                    <p>{textWhenEmpty}</p>
                    <Link to={linkWhenEmpty}>{textLinkWhenEmpty}</Link>
                </div>
            )}
        </div>
    );
};

export default NoticeOfCourseList;
