import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { googleLogout } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import * as actions from '~/store/actions';

const Logout = () => {
    const dispatch = useDispatch();
    return (
        <div
            onClick={() => {
                googleLogout();
                dispatch(actions.logoutSuccess());
            }}
        >
            <FontAwesomeIcon icon={faArrowRightFromBracket} /> Đăng xuất
        </div>
    );
};

export default Logout;
