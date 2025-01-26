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
		updatePost: builder.mutation({
			queryFn: async ({ id, title }, { getState }) => {
				const posts = getState().api.queries['getPosts(undefined)']?.data || [];
				return {
					data: posts.map((post) =>
						post.id === id ? { ...post, title } : post
					),
				};
			},
		}),
		deletePost: builder.mutation({
			query: (id) => ({
				url: `/posts/${id}`,
				method: 'DELETE',
			}), // DELETE /api/posts/:id
			invalidatesTags: ['Posts'], // 削除後にキャッシュを無効化してリストを更新
		}),
	}),
});

export const {
	useGetPostsQuery,
	useGetPostByIdQuery,
	useUpdatePostMutation,
	useDeletePostMutation,
} = apiSlice;
export default apiSlice;
