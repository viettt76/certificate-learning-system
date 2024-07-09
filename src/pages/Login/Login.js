import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginService, verifyTokenService } from '~/services';
import { customToast } from '~/utils/commonUtils';

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVerifyToken = async () => {
            try {
                const res = await verifyTokenService();
                if (!res?.errCode) {
                    navigate('/');
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchVerifyToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="d-flex justify-content-center mt-3">
            <GoogleLogin
                onSuccess={async (credentialResponse) => {
                    try {
                        const decoded = jwtDecode(credentialResponse?.credential);
                        const res = await loginService({
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
                        customToast('error', 'Login failed');
                    }
                }}
                onError={() => {
                    customToast('error', 'Login failed');
                }}
            />
        </div>
    );
};

export default Login;
