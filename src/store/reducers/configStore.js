// import { createStore } from 'redux';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// import rootReducer from './rootReducer';

// const persistConfig = {
//     key: 'root',
//     storage,
//     whitelist: ['email', 'email_verified', 'family_name', 'given_name', 'locale', 'name', 'picture'],
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const configStore = () => {
//     let store = createStore(persistedReducer);
//     let persistor = persistStore(store);
//     return { store, persistor };
// };

// export default configStore;
