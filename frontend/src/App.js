import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
	const [posts, setPosts] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		axios
			.get('http://localhost:5001/api/posts')
			.then((response) => setPosts(response.data))
			.catch((error) => {
				console.error('Error fetching posts:', error);
				setError(error);
			});
	}, []);

	return (
		<div className='min-h-screen bg-gray-100 p-5'>
			<h1 className='text-2xl font-bold text-center mb-5'>
				JSONPlaceholder Posts
			</h1>
			{error && (
				<p className='text-red-500 text-center'>データ取得に失敗しました。</p>
			)}
			<div className='max-w-4xl mx-auto bg-white p-5 rounded shadow'>
				{posts.length > 0 ? (
					posts.map((post) => (
						<div key={post.id} className='border-b last:border-0 p-3'>
							<h2 className='text-lg font-semibold'>{post.title}</h2>
							<p className='text-gray-700'>{post.body}</p>
						</div>
					))
				) : (
					<p className='text-center'>データを取得中...</p>
				)}
			</div>
		</div>
	);
}

export default App;
