import clsx from 'clsx';
import styles from './Course.module.scss';

const Course = ({ course }) => {
    return (
        <div className={clsx(styles['wrapper'])}>
            <img className={clsx(styles['img'])} src={course?.img} alt={course?.name} />
            <p className={clsx(styles['name'])}>{course?.name}</p>
            <p className={clsx(styles['genres'])}>{course?.genres}</p>
            <div className={clsx(styles['author-time'])}>
                <div className={clsx(styles['author-info'])}>
                    <img className={clsx(styles['img-author'])} src={course?.imgAuthor} alt={course?.nameAuthor} />
                    <span className={clsx(styles['name-author'])}>{course?.nameAuthor}</span>
                </div>
                <div className={clsx(styles['time'])}>{course?.time}</div>
            </div>
            <div className={clsx(styles['fee-actions'])}>
                <span className={clsx(styles['fee'])}>{course?.fee}</span>
                <button className={clsx(styles['button-learn'])}>Học ngay ></button>
            </div>
        </div>
    );
};

export default Course;
