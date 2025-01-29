// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// /*
//  * RTK Query(createAsyncThunk)を使用した書き方
//  */
// export const apiSlice = createApi({
// 	reducerPath: 'api', // Redux ストア内の識別名
// 	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5001/api' }), // API のベースURL
// 	tagTypes: ['Posts'],
// 	endpoints: (builder) => ({
// 		getPosts: builder.query({
// 			query: () => '/posts', // GET /api/posts
// 			providesTags: ['Posts'],
// 		}),
// 		getPostById: builder.query({
// 			query: (id) => `/posts/${id}`, // GET /api/posts/:id
// 		}),
// 		updatePost: builder.mutation({
// 			queryFn: async ({ id, title }, { getState }) => {
// 				const posts = getState().api.queries['getPosts(undefined)']?.data || [];
// 				return {
// 					data: posts.map((post) =>
// 						post.id === id ? { ...post, title } : post
// 					),
// 				};
// 			},
// 			invalidatesTags: ['Posts'],
// 		}),
// 		deletePost: builder.mutation({
// 			query: (id) => ({
// 				url: `/posts/${id}`,
// 				method: 'DELETE',
// 			}), // DELETE /api/posts/:id
// 			invalidatesTags: ['Posts'], // 削除後にキャッシュを無効化してリストを更新
// 		}),
// 	}),
// });

// export const {
// 	useGetPostsQuery,
// 	useGetPostByIdQuery,
// 	useUpdatePostMutation,
// 	useDeletePostMutation,
// } = apiSlice;
// export default apiSlice;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/*
 * RTK Query mySQLを使用した場合
 */
export const apiSlice = createApi({
	reducerPath: 'api', // Redux ストア内の識別名
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }), // API のベースURL
	tagTypes: ['Posts'], // キャッシュ管理用のタグ

	endpoints: (builder) => ({
		// **投稿一覧を取得**
		getPosts: builder.query({
			query: () => '/posts', // GET /api/posts
			providesTags: ['Posts'],
		}),

		// **特定の投稿を取得**
		getPostById: builder.query({
			query: (id) => `/posts/${id}`, // GET /api/posts/:id
		}),

		// **投稿を追加**
		addPost: builder.mutation({
			query: (newPost) => ({
				url: '/posts',
				method: 'POST',
				body: newPost,
			}),
			invalidatesTags: ['Posts'], // 投稿後にキャッシュを更新
		}),

		// **投稿を更新**
		updatePost: builder.mutation({
			query: ({ id, title, content }) => ({
				url: `/posts/${id}`,
				method: 'PUT',
				body: { title, content },
			}),
			invalidatesTags: ['Posts'],
		}),

		// **投稿を削除**
		deletePost: builder.mutation({
			query: (id) => ({
				url: `/posts/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Posts'], // 削除後にキャッシュを無効化してリストを更新
		}),
	}),
});

// フックをエクスポート
export const {
	useGetPostsQuery,
	useGetPostByIdQuery,
	useAddPostMutation,
	useUpdatePostMutation,
	useDeletePostMutation,
} = apiSlice;

export default apiSlice;
