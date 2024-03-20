import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import styles from './NoticeOfCourseList.module.scss';
import { useEffect, useRef, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CoursesLiked = ({ listCourses, icon, textWhenEmpty, textLinkWhenEmpty, linkWhenEmpty }) => {
    const [listCoursesLiked, setListCoursesLiked] = useState([]);
    const [showListCoursesLiked, setShowListCoursesLiked] = useState(false);

    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setShowListCoursesLiked(false);
        }
    };

    useEffect(() => {
        setListCoursesLiked(listCourses);
    }, [listCourses]);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return (
        <div ref={ref} className={clsx(styles['wrapper'])}>
            <FontAwesomeIcon
                onClick={() => setShowListCoursesLiked(!showListCoursesLiked)}
                className={clsx(styles['icon'])}
                icon={icon}
            />
            {listCoursesLiked.length > 0 ? (
                <ListGroup
                    className={clsx(styles['group-courses'], {
                        [styles['show-group-courses']]: showListCoursesLiked,
                    })}
                >
                    {listCoursesLiked.map((item, index) => {
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
            ) : (
                <div
                    className={clsx(styles['group-courses'], styles['group-courses-empty'], {
                        [styles['show-group-courses']]: showListCoursesLiked,
                    })}
                >
                    <p>{textWhenEmpty}</p>
                    <Link to={linkWhenEmpty}>{textLinkWhenEmpty}</Link>
                </div>
            )}
        </div>
    );
};

export default CoursesLiked;
