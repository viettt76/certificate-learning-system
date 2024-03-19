import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import * as actions from '~/store/actions';

const Login = () => {
    return (
        <GoogleLogin
            onSuccess={(credentialResponse) => {
                const decoded = jwtDecode(credentialResponse?.credential);
            }}
            onError={() => {
                console.log('Login Failed');
            }}
        />
    );
};

export default Login;
