import {configureStore} from '@reduxjs/toolkit';
import {api} from './api';
import teamReducer from './teamSlice';

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        team: teamReducer,
    },
    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;