import { createStore } from 'redux';
import { Reducer, initalState } from './reducer';

export const ConfigureStore = () => {
    const store = createStore(
        Reducer,
        initialStore
    );
    return store;
};