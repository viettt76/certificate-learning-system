import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Provider } from 'react-redux';
import store, { persistor } from './store/reducers/rootReducer';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
                <PersistGate persistor={persistor}>
                    <App />
                </PersistGate>
            </GoogleOAuthProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);
