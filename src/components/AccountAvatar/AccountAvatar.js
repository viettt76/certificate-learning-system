import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './AccountAvatar.module.scss';
import Logout from '~/components/Logout';
import { convertBufferToBase64 } from '~/utils/commonUtils';
import { getPersonalInfoService } from '~/services';

const userMenu = [
    [{ title: 'Học tập' }, { title: 'Giỏ hàng' }, { title: 'Giảng dạy trên VEdu', link: '/teaching/teach-header' }],
    [{ title: 'Thông báo' }, { title: 'Tin nhắn' }],
    [{ title: 'Hồ sơ công khai' }, { title: 'Chỉnh sửa hồ sơ' }],
    [{ title: 'Đăng xuất', component: Logout }],
];

const teacherMenu = [
    [{ title: 'Học viên' }],
    [{ title: 'Thông báo' }],
    [{ title: 'Hồ sơ công khai' }, { title: 'Chỉnh sửa hồ sơ' }],
    [{ title: 'Đăng xuất', component: Logout }],
];

const AccountAvatar = ({ type = 'user' }) => {
    const [userInfo, setUserInfo] = useState(null);

    const [menu, setMenu] = useState([]);
    const [showMenu, setShowMenu] = useState(false);

    const ref = useRef(null);

    useEffect(() => {
        if (type.toLowerCase() === 'user') {
            setMenu(userMenu);
        } else if (type.toLowerCase() === 'teacher') {
            setMenu(teacherMenu);
        }
    }, [type]);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                let res = await getPersonalInfoService();
                if (!res?.errCode) {
                    setUserInfo(res?.data);
                } else {
                    setUserInfo(null);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserInfo();
    }, []);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setShowMenu(false);
        }
    };

    return (
        <div className={clsx(styles['wrapper'])} ref={ref}>
            <img
                className={clsx('rounded-circle', styles['avatar'])}
                src={convertBufferToBase64(userInfo?.picture)}
                alt={`${userInfo?.familyName} ${userInfo?.givenName}`}
                onClick={() => setShowMenu(!showMenu)}
            />
            {showMenu && (
                <div className={clsx(styles['menu'])}>
                    <div className={clsx(styles['menu-user-info'])}>
                        <img
                            className={clsx('rounded-circle', styles['menu-avatar'])}
                            src={convertBufferToBase64(userInfo?.picture)}
                            alt={userInfo?.name}
                        />
                        <div className={clsx(styles['menu-name-email'])}>
                            <span
                                className={clsx(styles['menu-user-name'])}
                            >{`${userInfo?.familyName} ${userInfo?.givenName}`}</span>
                            <span className={clsx(styles['menu-user-email'])}>{userInfo?.email}</span>
                        </div>
                    </div>
                    <ul className={clsx(styles['menu-section'])}>
                        {menu?.map((section, index) => {
                            return (
                                <li key={`section-${index}`} className={clsx(styles['section'])}>
                                    <ul className={clsx(styles['group-menu-item'])}>
                                        {section?.map((item) => {
                                            if (item?.component) {
                                                let Component = item?.component;
                                                return (
                                                    <li key={`item-${index}`} className={clsx(styles['menu-item'])}>
                                                        <Component />
                                                    </li>
                                                );
                                            }
                                            if (item?.link) {
                                                return (
                                                    <li key={`item-${index}`} className={clsx(styles['menu-item'])}>
                                                        <Link to={item?.link}>{item?.title}</Link>
                                                    </li>
                                                );
                                            } else {
                                                return (
                                                    <li key={`item-${index}`} className={clsx(styles['menu-item'])}>
                                                        {item?.title}
                                                    </li>
                                                );
                                            }
                                        })}
                                    </ul>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AccountAvatar;
