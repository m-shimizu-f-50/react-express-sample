import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/*
 * RTK Query(createAsyncThunk)を使用した書き方
 */
export const apiSlice = createApi({
	reducerPath: 'api', // Redux ストア内の識別名
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5001/api' }), // API のベースURL
	endpoints: (builder) => ({
		getPosts: builder.query({
			query: () => '/posts', // GET /api/posts
		}),
		getPostById: builder.query({
			query: (id) => `/posts/${id}`, // GET /api/posts/:id
		}),
	}),
});

export const { useGetPostsQuery, useGetPostByIdQuery } = apiSlice;
export default apiSlice;
