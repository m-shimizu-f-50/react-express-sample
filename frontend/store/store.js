import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postsSlice';
import { apiSlice } from './apiSlice';

const store = configureStore({
	reducer: {
		// RTK Queryを使用しない場合(従来のRedux)
		// posts: postsReducer,

		// RTK Queryを使用する場合
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	// RTK Queryを使用する場合(RTK Query を動かすためのミドルウェアを追加)
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
