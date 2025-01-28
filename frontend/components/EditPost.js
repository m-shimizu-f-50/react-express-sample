import { useDeletePostMutation } from '../store/apiSlice';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export default function EditPost({ post }) {
	const [deletePost] = useDeletePostMutation();
	const router = useRouter();

	// 削除処理
	const handleDelete = async (id) => {
		try {
			await deletePost(id).unwrap();
			toast.success('投稿を削除しました！');
		} catch (error) {
			toast.error('削除に失敗しました');
		}
	};

	// 詳細画面へ遷移
	const handleNavigate = () => {
		router.push(`/posts/${post.id}`);
	};

	return (
		<div className='p-4 border rounded-lg shadow-md bg-white flex justify-between items-center'>
			{/* タイトル */}
			<h2 className='text-lg font-semibold text-gray-800'>{post.title}</h2>

			{/* ボタン群 */}
			<div className='flex space-x-3'>
				<button
					onClick={handleNavigate}
					className='bg-gray-500 hover:bg-gray-600 text-white font-medium px-5 py-2 rounded-lg transition duration-300'
				>
					詳細
				</button>
				<button
					onClick={() => handleDelete(post.id)}
					className='bg-red-500 hover:bg-red-600 text-white font-medium px-5 py-2 rounded-lg transition duration-300'
				>
					削除
				</button>
			</div>
		</div>
	);
}
