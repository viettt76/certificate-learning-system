import clsx from 'clsx';
import styles from './Course.module.scss';
import { Link } from 'react-router-dom';

const Course = ({ courseId, img, name, imgAuthor, nameAuthor, time, price, isTeacher = false }) => {
    return (
        <Link to={isTeacher ? `/course/${courseId}/lesson` : `/course/${courseId}`} className={clsx(styles['wrapper'])}>
            <img className={clsx(styles['img'])} src={img} alt={name} />
            <p className={clsx(styles['name'])}>{name}</p>
            <div className={clsx(styles['author-time'])}>
                <div className={clsx(styles['author-info'])}>
                    <img className={clsx(styles['img-author'])} src={imgAuthor} alt={nameAuthor} />
                    <span className={clsx(styles['name-author'])}>{nameAuthor}</span>
                </div>
                <div className={clsx(styles['time'])}>{time}</div>
            </div>
            <div className={clsx(styles['price-actions'])}>
                <span className={clsx(styles['price'])}>
                    {price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                </span>
                {!isTeacher && <button className={clsx(styles['button-learn'])}>Học ngay {'>'}</button>}
            </div>
        </Link>
    );
};

export default Course;
