import { combineReducers, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './userReducer';

const userPersistConfig = {
    key: 'user',
    storage,
    whitelist: ['id', 'email', 'emailVerified', 'familyName', 'givenName', 'name', 'picture', 'isTeacher'],
};

const rootReducer = combineReducers({
    user: persistReducer(userPersistConfig, userReducer),
});

const store = createStore(rootReducer);
export const persistor = persistStore(store);

export default store;
