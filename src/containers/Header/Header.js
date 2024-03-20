import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMagnifyingGlass, faHeart } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import styles from './Header.module.scss';
import logo from '~/assets/imgs/VEdu.png';

import { userInfoSelector } from '~/store/selectors';
import AccountAvatar from '~/components/AccountAvatar';

const Header = () => {
    const userInfo = useSelector(userInfoSelector);
    return (
        <div className={clsx(styles['header'])}>
            <Link to="/">
                <img width={50} height={50} src={logo} alt="VEdu" />
            </Link>
            <div className={clsx(styles['search-wrapper'])}>
                <input placeholder="Tìm tên khoá học" />
                <button className={clsx(styles['search-button'])}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
            {userInfo?.email_verified ? (
                <div className={clsx(styles['user-actions'])}>
                    <FontAwesomeIcon className={clsx(styles['user-action'])} icon={faHeart} />
                    <FontAwesomeIcon className={clsx(styles['user-action'])} icon={faCartShopping} />
                    <AccountAvatar className={clsx(styles['user-action'])} userInfo={userInfo} />
                </div>
            ) : (
                <div>
                    <Link className={clsx('btn btn-light font-weight-bold', styles['btn-login'])} to="/login">
                        Đăng nhập
                    </Link>
                    <Link className={clsx('btn btn-dark font-weight-bold', styles[''])} to="/register">
                        Đăng ký
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Header;
