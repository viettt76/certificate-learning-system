import { combineReducers, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './userReducer';

const userPersistConfig = {
    key: 'user',
    storage,
    whitelist: ['email', 'email_verified', 'family_name', 'given_name', 'locale', 'name', 'picture'],
};

const rootReducer = combineReducers({
    user: persistReducer(userPersistConfig, userReducer),
});

const store = createStore(rootReducer);
export const persistor = persistStore(store);

export default store;
