import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createAccountService } from '~/services';
import * as actions from '~/store/actions';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <div className="d-flex justify-content-center mt-3">
            <GoogleLogin
                onSuccess={async (credentialResponse) => {
                    const decoded = jwtDecode(credentialResponse?.credential);
                    let res = await createAccountService({
                        email: decoded?.email,
                        familyName: decoded?.family_name,
                        givenName: decoded?.given_name,
                        picture: decoded?.picture,
                        createAt: new Date(),
                        updateAt: null,
                    });
                    dispatch(
                        actions.loginSuccess({
                            id: res?.data?.id,
                            email: decoded?.email,
                            emailVerified: decoded?.email_verified,
                            familyName: decoded?.family_name,
                            givenName: decoded?.given_name,
                            name: decoded?.name,
                            picture: decoded?.picture,
                            isTeacher: res?.data?.isTeacher,
                        }),
                    );
                    navigate('/');
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
        </div>
    );
};

export default Login;
