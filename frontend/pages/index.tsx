import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../store/postsSlice';

export default function Home() {
	// const [posts, setPosts] = useState([]);
	// 例： SPA(CSR)開発の場合のAPIリクエスト(axios,userEffect)
	//
	// useEffect(() => {
	// 	axios
	// 		.get('http://localhost:5001/api/posts')
	// 		.then((response) => setPosts(response.data))
	// 		.catch((error) => console.error('Error fetching posts:', error));
	// }, []);

	// 例： Reduxを利用したAPIリクエスト(fetchPosts)
	const dispatch = useDispatch();
	const { posts, status, error } = useSelector((state) => state.posts);
	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchPosts());
		}
	}, [status, dispatch]);

	const statusMessages = {
		loading: <p className='text-center text-gray-500'>データを取得中...</p>,
		failed: <p className='text-center text-red-500'>エラー: {error}</p>,
	};

	return (
		<div className='min-h-screen bg-gray-100 p-5'>
			<h1 className='text-2xl font-bold text-center mb-5'>投稿一覧</h1>
			<div className='max-w-4xl mx-auto bg-white p-5 rounded shadow'>
				{status !== 'succeeded'
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
					  ))}
			</div>
		</div>
	);
}
