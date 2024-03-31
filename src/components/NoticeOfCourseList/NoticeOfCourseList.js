import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import styles from './NoticeOfCourseList.module.scss';
import { useEffect, useRef, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NoticeOfCourseList = ({ title, courseList, icon, textWhenEmpty, textLinkWhenEmpty, linkWhenEmpty }) => {
    const [CourseListState, setCourseListState] = useState([]);
    const [showCourseList, setShowCourseList] = useState(false);

    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setShowCourseList(false);
        }
    };

    useEffect(() => {
        setCourseListState(courseList);
    }, [courseList]);

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
            {CourseListState.length > 0 ? (
                <div>
                    <ListGroup
                        className={clsx(styles['group-courses'], {
                            [styles['show-group-courses']]: showCourseList,
                        })}
                    >
                        <h5 className={clsx(styles['title'])}>{title}</h5>
                        {CourseListState.map((item, index) => {
                            return (
                                <ListGroup.Item className={clsx(styles['course'])} key={`course-${index}`}>
                                    <img className={clsx(styles['course-img'])} src={item?.img} alt={item?.name} />
                                    <div>
                                        <h5 className={clsx(styles['course-name'])}>{item?.name}</h5>
                                        <span className={clsx(styles['course-price'])}>{item?.price}</span>
                                    </div>
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
