import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from '../reducers';
import sagas from '../sagas';
import localStorage from 'redux-persist/lib/storage'

export const persistConfig = {
    key: 'root',
    storage: localStorage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        persistedReducer,
        applyMiddleware(sagaMiddleware),
    );

    let persistor = persistStore(store);
    sagaMiddleware.run(sagas);

    return { store, persistor };
};
