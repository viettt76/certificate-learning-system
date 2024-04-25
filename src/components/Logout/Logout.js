import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { logoutService } from '~/services';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        googleLogout();
        logoutService();
        window.location.reload();
        navigate('/');
    };
    return (
        <div onClick={handleLogout}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} /> Đăng xuất
        </div>
    );
};

export default Logout;
