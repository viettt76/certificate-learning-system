import { googleLogout } from '@react-oauth/google';

const Logout = () => {
    return <div onClick={() => googleLogout()}>Logout</div>;
};

export default Logout;
