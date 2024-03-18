import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import * as actions from '~/store/actions';

const Login = () => {
    const dispatch = useDispatch();
    return (
        <GoogleLogin
            onSuccess={(credentialResponse) => {
                const decoded = jwtDecode(credentialResponse?.credential);
                dispatch(actions.loginSuccess(decoded));
            }}
            onError={() => {
                console.log('Login Failed');
            }}
        />
    );
};

export default Login;
