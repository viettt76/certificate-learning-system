import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
            <App />
        </GoogleOAuthProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);
