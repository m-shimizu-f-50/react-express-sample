import { useGetPostsQuery } from '../store/apiSlice';
import EditPost from './EditPost';

export default function PostList() {
	const { data: posts, error, isLoading } = useGetPostsQuery();

	return (
		<div className='min-h-screen bg-gray-100 p-5'>
			<h1 className='text-2xl font-bold text-center mb-5'>投稿一覧</h1>
			<div className='max-w-4xl mx-auto bg-white p-5 rounded shadow'>
				{isLoading && (
					<p className='text-center text-gray-500'>データを取得中...</p>
				)}
				{error && (
					<p className='text-center text-red-500'>エラー: {error.message}</p>
				)}
				{!isLoading && !error && posts
					? posts.map((post) => (
							<div key={post.id} className='p-3'>
								<EditPost post={post} />
							</div>
					  ))
					: null}
			</div>
		</div>
	);
}
