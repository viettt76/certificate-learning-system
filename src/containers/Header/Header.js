import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import styles from './Header.module.scss';
import logo from '~/assets/imgs/VEdu.png';

const Header = () => {
    return (
        <div className={clsx(styles['header'])}>
            <img width={50} height={50} src={logo} alt="VEdu" />
            <div className={clsx(styles['search-wrapper'])}>
                <input placeholder="Tìm tên khoá học" />
                <button className={clsx(styles['search-button'])}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
            <div>
                <button>Đăng nhập</button>
                <button>Đăng ký</button>
            </div>
        </div>
    );
};

export default Header;
