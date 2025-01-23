import { useRouter } from 'next/router';
import axios from 'axios';

//例： SSRの場合のAPIリクエスト(getServerSideProps)
export async function getServerSideProps({ params }) {
	const { id } = params;
	const response = await axios.get(`http://localhost:5001/api/posts/${id}`);
	const post = response.data;

	return {
		props: { post },
	};
}

export default function PostDetail({ post }) {
	const router = useRouter();

	if (!post) {
		return <div>Loading...</div>;
	}

	return (
		<div className='min-h-screen bg-gray-100 p-5'>
			<button
				onClick={() => router.push('/')}
				className='bg-blue-500 text-white px-4 py-2 rounded'
			>
				Back to Home
			</button>
			<div className='max-w-4xl mx-auto bg-white p-5 rounded shadow mt-5'>
				<h2 className='text-2xl font-bold'>{post.title}</h2>
				<p className='text-gray-700 mt-3'>{post.body}</p>
			</div>
		</div>
	);
}
