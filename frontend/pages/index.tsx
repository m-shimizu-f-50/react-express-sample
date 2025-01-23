import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		axios
			.get('http://localhost:5001/api/posts')
			.then((response) => setPosts(response.data))
			.catch((error) => console.error('Error fetching posts:', error));
	}, []);

	return (
		<div className='min-h-screen bg-gray-100 p-5'>
			<h1 className='text-2xl font-bold text-center mb-5'>
				JSONPlaceholder Posts
			</h1>
			<div className='max-w-4xl mx-auto bg-white p-5 rounded shadow'>
				{posts.map((post) => (
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
