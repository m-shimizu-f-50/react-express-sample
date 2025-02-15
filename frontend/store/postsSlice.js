import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/*
 * 従来のReduxの書き方
 */
// API からデータを取得する非同期アクション
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
	const response = await axios.get('http://localhost:5001/api/posts');
	return response.data;
});

const postsSlice = createSlice({
	name: 'posts',
	initialState: {
		posts: [],
		status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPosts.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.posts = action.payload;
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export default postsSlice.reducer;
