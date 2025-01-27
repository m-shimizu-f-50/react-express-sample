import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
// 従来のRedux 例： Reduxを利用したAPIリクエスト(fetchPosts)
import { fetchPosts } from '../store/postsSlice';
// RTK Queryを利用したAPIリクエスト
import { useGetPostsQuery } from '../store/apiSlice';

import PostList from '../components/PostList';

export default function Home() {
	/*
	 * 例： SPA(CSR)開発の場合のAPIリクエスト(axios,userEffect)
	 */
	// const [posts, setPosts] = useState([]);
	// useEffect(() => {
	// 	axios
	// 		.get('http://localhost:5001/api/posts')
	// 		.then((response) => setPosts(response.data))
	// 		.catch((error) => console.error('Error fetching posts:', error));
	// }, []);

	/*
	 * 従来のRedux 例： Reduxを利用したAPIリクエスト(fetchPosts)
	 */
	// const dispatch = useDispatch();
	// const { posts, status, error } = useSelector((state) => state.posts);
	// useEffect(() => {
	// 	if (status === 'idle') {
	// 		dispatch(fetchPosts());
	// 	}
	// }, [status, dispatch]);
	// const statusMessages = {
	// 	loading: <p className='text-center text-gray-500'>データを取得中...</p>,
	// 	failed: <p className='text-center text-red-500'>エラー: {error}</p>,
	// };

	/*
	 * Redux Toolkit Query 例： ReduxのRTK Queryを利用したAPIリクエスト(useGetPostsQuery)
	 */
	// const { data: posts, error, isLoading } = useGetPostsQuery();

	return (
		<div className='min-h-screen bg-gray-100 p-5'>
			{/* 従来のRedux */}
			{/* {status !== 'succeeded'
					? statusMessages[status] || (
							<p className='text-center'>不明な状態です</p>
					  )
					: posts.map((post) => (
							<Link
								key={post.id}
								href={`/posts/${post.id}`}
								className='block border-b last:border-0 p-3 hover:bg-gray-200'
							>
								<h2 className='text-lg font-semibold'>{post.title}</h2>
							</Link>
					  ))} */}

			{/* RTK Query */}
			{/* 状態管理を簡潔にする */}
			{/* {isLoading && (
					<p className='text-center text-gray-500'>データを取得中...</p>
				)}
				{error && (
					<p className='text-center text-red-500'>エラー: {error.message}</p>
				)}
				{!isLoading && !error && posts
					? posts.map((post) => (
							<Link
								key={post.id}
								href={`/posts/${post.id}`}
								className='block border-b last:border-0 p-3 hover:bg-gray-200'
							>
								<h2 className='text-lg font-semibold'>{post.title}</h2>
							</Link>
					  ))
					: null} */}

			{/* 上記をコンポーネント化 */}
			<PostList />
		</div>
	);
}
