import { all } from 'redux-saga/effects';
import watchToappSaga from './app.saga';

export default function* sagas() {
    yield all([watchToappSaga()]);
}
