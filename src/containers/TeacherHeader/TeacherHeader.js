import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import clsx from 'clsx';
import AccountAvatar from '~/components/AccountAvatar';
import styles from './TeachHeader.module.scss';
import { useEffect, useState } from 'react';

const TeacherHeader = () => {
    const location = useLocation();

    const [showNav, setShowNav] = useState(false);

    useEffect(() => {
        if (location.pathname === '/instructor/courses') {
            setShowNav(false);
        } else {
            setShowNav(true);
        }
    }, [location]);

    return (
        <div className={clsx('container mt-3', styles['wrapper'])}>
            <div>
                {showNav && (
                    <div className={clsx(styles['wrapper-right'])}>
                        <Link to="/instructor/courses" className={clsx('btn btn-primary', styles['course-management'])}>
                            Quản lý khoá học
                        </Link>
                    </div>
                )}
            </div>
            <div className={clsx(styles['wrapper-left'])}>
                <Link to="/" className={clsx(styles['link'])}>
                    Học viên
                </Link>
                <FontAwesomeIcon icon={faBell} className={clsx(styles['icon'])} />
                <AccountAvatar className={clsx(styles['user-avatar'])} type="teacher" />
            </div>
        </div>
    );
};

export default TeacherHeader;
