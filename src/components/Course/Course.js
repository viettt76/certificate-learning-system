import clsx from 'clsx';
import { Link } from 'react-router-dom';
import styles from './Course.module.scss';
import { convertBufferToBase64, formatPrice } from '~/utils/commonUtils';

const Course = ({ courseId, img, name, authorId, imgAuthor, nameAuthor, time, price, isTeacher = false }) => {
    return (
        <div className={clsx(styles['wrapper'])}>
            <img className={clsx(styles['img'])} src={img} alt={name} />
            <p className={clsx(styles['name'])}>{name}</p>
            <div className={clsx(styles['author-time'])}>
                <Link to={`/teacher/${authorId}`} className={clsx(styles['author-info'])}>
                    <img
                        className={clsx(styles['img-author'])}
                        src={convertBufferToBase64(imgAuthor)}
                        alt={nameAuthor}
                    />
                    <span className={clsx(styles['name-author'])}>{nameAuthor}</span>
                </Link>
                <div className={clsx(styles['time'])}>{time}</div>
            </div>
            <div className={clsx(styles['price-actions'])}>
                <span className={clsx(styles['price'])}>{formatPrice(price, 'VND')}</span>
                {!isTeacher ? (
                    <Link to={`/course/${courseId}`} className={clsx(styles['button'], styles['button-manage'])}>
                        Học ngay {'>'}
                    </Link>
                ) : (
                    <Link className={clsx(styles['button'], styles['button-manage'])} to={`/course/${courseId}/manage`}>
                        Quản lý
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Course;
