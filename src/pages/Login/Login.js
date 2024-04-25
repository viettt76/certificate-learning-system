import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { loginService } from '~/services';
import { customToast } from '~/utils/commonUtils';

const Login = () => {
    const navigate = useNavigate();
    return (
        <div className="d-flex justify-content-center mt-3">
            <GoogleLogin
                onSuccess={async (credentialResponse) => {
                    try {
                        const decoded = jwtDecode(credentialResponse?.credential);
                        let res = await loginService({
                            email: decoded?.email,
                            familyName: decoded?.family_name,
                            givenName: decoded?.given_name,
                            picture: decoded?.picture,
                        });
                        if (!res?.errCode) {
                            navigate('/');
                        } else {
                            customToast('error', 'Login failed');
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
        </div>
    );
};

export default Login;
