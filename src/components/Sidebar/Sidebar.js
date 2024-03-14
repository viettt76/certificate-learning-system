import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import styles from './Sidebar.module.scss';

const Sidebar = () => {
    return (
        <div className={clsx(styles['wrapper'])}>
            <div className={clsx(styles['item'])}>
                <FontAwesomeIcon icon={faHouse} />
                <span>Trang chủ</span>
            </div>
        </div>
    );
};

export default Sidebar;
