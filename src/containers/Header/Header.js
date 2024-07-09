import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMagnifyingGlass, faHeart, faChalkboardUser } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import styles from './Header.module.scss';
import logo from '~/assets/imgs/VEdu.png';
import AccountAvatar from '~/components/AccountAvatar';
import NoticeOfCourseList from '~/components/NoticeOfCourseList';
import { getPersonalInfoService, searchTeacherService, searchCourseService } from '~/services';
import useDebounce from '~/hooks/useDebounce';
import { convertBufferToBase64 } from '~/utils/commonUtils';

const Header = () => {
    const [userInfo, setUserInfo] = useState(null);

    const [keyword, setKeyword] = useState('');
    const [searchCourseList, setSearchCourseList] = useState([]);
    const [searchTeacherList, setSearchTeacherList] = useState([]);

    const searchKeyword = useDebounce(keyword, 500);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const res = await getPersonalInfoService();
                if (!res?.errCode) {
                    setUserInfo(res?.data);
                } else {
                    setUserInfo(null);
                }
            } catch (error) {
                console.log(error);
                setUserInfo(null);
            }
        };

        fetchUserInfo();
    }, []);

    useEffect(() => {
        const fetchSearch = async () => {
            try {
                const resCourse = await searchCourseService(searchKeyword);
                const resTeacher = await searchTeacherService(searchKeyword);
                setSearchCourseList(resCourse?.data);
                setSearchTeacherList(resTeacher?.data);
            } catch (error) {
                console.log(error);
            }
        };

        if (searchKeyword || keyword?.length > 0) fetchSearch();
        else {
            setSearchCourseList([]);
            setSearchTeacherList([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchKeyword]);

    return (
        <div className={clsx(styles['header'])}>
            <Link to="/">
                <img width={50} height={50} src={logo} alt="VEdu" />
            </Link>
            <div className={clsx(styles['search-wrapper'])}>
                <div className={clsx(styles['search-input'])}>
                    <input onKeyUp={(e) => setKeyword(e.target.value)} placeholder="Tìm tên khoá học, giảng viên" />
                    <button className={clsx(styles['search-button'])}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
                {(searchCourseList?.length > 0 || searchTeacherList?.length > 0) && (
                    <ul className={clsx(styles['search-result'])}>
                        {searchCourseList?.map((course) => {
                            return (
                                <li key={`course-${course?.id}`}>
                                    <Link to={`/course/${course?.id}`} className={clsx(styles['result-item'])}>
                                        <img alt={course?.name} src={convertBufferToBase64(course?.img)} />
                                        <div className={clsx(styles['result-item-info'])}>
                                            <h6 className={clsx(styles['result-item-header'])}>{course?.name}</h6>
                                            <div className={clsx(styles['result-item-expand'])}>
                                                <span className={clsx(styles['result-item-author-header'])}>
                                                    Khoá học
                                                </span>
                                                <span className={clsx(styles['result-item-author-name'])}>
                                                    {course?.authorInfo?.familyName} {course?.authorInfo?.givenName}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            );
                        })}
                        {searchTeacherList?.map((teacher) => {
                            return (
                                <li key={`teacher-${teacher?.id}`}>
                                    <Link to={`teacher/${teacher?.id}`} className={clsx(styles['result-item'])}>
                                        <img
                                            alt={`${teacher?.familyName} ${teacher?.givenName}`}
                                            src={convertBufferToBase64(teacher?.picture)}
                                        />
                                        <div className={clsx(styles['result-item-info'])}>
                                            <h6 className={clsx(styles['result-item-header'])}>
                                                {teacher?.familyName} {teacher?.givenName}
                                            </h6>
                                            <div className={clsx(styles['result-item-expand'])}>
                                                <span className={clsx(styles['result-item-author-header'])}>
                                                    Giảng viên
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
            {userInfo ? (
                <div className={clsx(styles['user-actions'])}>
                    <NoticeOfCourseList
                        title="Giỏ hàng"
                        type="cart"
                        icon={faCartShopping}
                        textWhenEmpty="Giỏ hàng của bạn đang trống."
                        textLinkWhenEmpty="Tiếp tục mua sắm"
                        linkWhenEmpty="/"
                    />
                    <NoticeOfCourseList
                        title="Khoá học yêu thích"
                        type="favorites"
                        icon={faHeart}
                        textWhenEmpty="Danh sách mong ước của bạn đang trống."
                        textLinkWhenEmpty="Khám phá các khoá học"
                        linkWhenEmpty="/"
                    />
                    <NoticeOfCourseList
                        title="Khoá học đang học"
                        type="studying"
                        icon={faChalkboardUser}
                        textWhenEmpty="Bạn chưa học khoá học nào."
                        textLinkWhenEmpty="Khám phá các khoá học"
                        linkWhenEmpty="/"
                    />
                    <AccountAvatar className={clsx(styles['user-action'])} />
                </div>
            ) : (
                <div>
                    <Link
                        className={clsx('btn btn-dark font-weight-bold text-nowrap', styles['btn-login'])}
                        to="/login"
                    >
                        Đăng nhập
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Header;
