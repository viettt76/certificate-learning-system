import clsx from 'clsx';
import styles from './AccountAvatar.module.scss';
import Logout from '~/components/Logout';

const AccountAvatar = ({ userInfo }) => {
    return (
        <div className={clsx(styles['wrapper'])}>
            <img className={clsx('rounded-circle', styles['avatar'])} src={userInfo?.picture} alt={userInfo?.name} />
            <div className={clsx(styles['menu'])}>
                <div className={clsx(styles['menu-user-info'])}>
                    <img
                        className={clsx('rounded-circle', styles['menu-avatar'])}
                        src={userInfo?.picture}
                        alt={userInfo?.name}
                    />
                    <div className={clsx(styles['menu-name-email'])}>
                        <span className={clsx(styles['menu-user-name'])}>{userInfo?.name}</span>
                        <span className={clsx(styles['menu-user-email'])}>{userInfo?.email}</span>
                    </div>
                </div>
                <ul className={clsx(styles['menu-section'])}>
                    <li className={clsx(styles['section'])}>
                        <ul className={clsx(styles['group-menu-item'])}>
                            <li className={clsx(styles['menu-item'])}>Học tập</li>
                            <li className={clsx(styles['menu-item'])}>Giỏ hàng của tôi</li>
                            <li className={clsx(styles['menu-item'])}>Mong muốn</li>
                            <li className={clsx(styles['menu-item'])}>Giảng dạy trên Udemy</li>
                        </ul>
                    </li>
                    <li className={clsx(styles['section'])}>
                        <ul className={clsx(styles['group-menu-item'])}>
                            <li className={clsx(styles['menu-item'])}>Thông báo</li>
                            <li className={clsx(styles['menu-item'])}>Tin nhắn</li>
                        </ul>
                    </li>
                    <li className={clsx(styles['section'])}>
                        <ul className={clsx(styles['group-menu-item'])}>
                            <li className={clsx(styles['menu-item'])}>
                                <Logout />
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default AccountAvatar;
