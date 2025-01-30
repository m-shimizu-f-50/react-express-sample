import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useUpdatePostMutation } from '../../store/apiSlice';

//例： SSRの場合のAPIリクエスト(getServerSideProps)
export async function getServerSideProps({ params }) {
	const { id } = params;
	const response = await axios.get(`http://localhost:3001/posts/${id}`);
	const post = response.data;

	return {
		props: { post },
	};
}

export default function PostDetail({ post }) {
	const router = useRouter();

	const [title, setTitle] = useState(post.title);
	const [content, setContent] = useState(post.content);

	// RTK Queryの更新ミューテーション
	const [updatePost] = useUpdatePostMutation();

	// post の値が変更された場合に状態を更新
	useEffect(() => {
		setTitle(post.title);
		setContent(post.content);
	}, [post]);

	// 更新処理
	const handleUpdate = async () => {
		try {
			await updatePost({ id: post.id, title, content }).unwrap();
			toast.success('投稿を更新しました！');
		} catch (error) {
			toast.error('更新に失敗しました');
		}
	};

	if (!post) {
		return <div>Loading...</div>;
	}

	return (
		<div className='min-h-screen bg-gray-100 p-6 flex justify-center items-center'>
			<div className='max-w-3xl w-full bg-white p-6 rounded-lg shadow-lg'>
				<h2 className='text-3xl font-bold text-center mb-6 text-gray-700'>
					詳細画面
				</h2>

				<div className='space-y-6'>
					{/* タイトル入力 */}
					<div className='flex items-center gap-4'>
						<label className='w-24 text-lg font-semibold text-gray-700'>
							タイトル：
						</label>
						<input
							type='text'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className='border border-gray-300 p-3 rounded-lg flex-grow focus:outline-none focus:ring-2 focus:ring-blue-400'
						/>
					</div>

					{/* 内容入力 */}
					<div className='flex items-center gap-4'>
						<label className='w-24 text-lg font-semibold text-gray-700'>
							内容：
						</label>
						<textarea
							value={content}
							onChange={(e) => setBody(e.target.value)}
							className='border border-gray-300 p-3 rounded-lg flex-grow focus:outline-none focus:ring-2 focus:ring-blue-400'
							rows='4'
						></textarea>
					</div>
				</div>

				{/* ボタン */}
				<div className='mt-8 flex justify-center space-x-6'>
					<button
						onClick={handleUpdate}
						className='bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition'
					>
						更新
					</button>
					<button
						onClick={() => router.push('/')}
						className='bg-gray-500 hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded-lg transition'
					>
						戻る
					</button>
				</div>
			</div>
		</div>
	);
}
