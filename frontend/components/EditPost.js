import { useState } from 'react';
import {
	useUpdatePostMutation,
	useDeletePostMutation,
} from '../store/apiSlice';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export default function EditPost({ post }) {
	const [title, setTitle] = useState(post.title);
	const [updatePost] = useUpdatePostMutation();
	const [deletePost] = useDeletePostMutation();
	const router = useRouter();

	// 更新処理
	const handleUpdate = async () => {
		// await updatePost({ id: post.id, title });
		try {
			await updatePost({ id: post.id, title }).unwrap();
			toast.success('投稿を更新しました！');
		} catch (error) {
			toast.error('更新に失敗しました');
		}
	};

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
		<div className='p-3 border'>
			<input
				type='text'
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				className='border p-2 rounded w-full'
			/>
			<div className='flex gap-2 mt-2'>
				<button
					onClick={handleUpdate}
					className='bg-blue-500 text-white px-4 py-2 rounded'
				>
					更新
				</button>
				<button
					onClick={() => handleDelete(post.id)}
					className='bg-red-500 text-white px-4 py-2 rounded'
				>
					削除
				</button>
				<button
					onClick={handleNavigate}
					className='bg-gray-500 text-white px-4 py-2 rounded'
				>
					詳細
				</button>
			</div>
		</div>
	);
}
