const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors()); // CORSを許可（フロントエンドとの通信のため）
app.use(express.json()); // JSONデータを扱う

// **全ての投稿を取得するAPI**
app.get('/posts', async (req, res) => {
	try {
		const [rows] = await db.query(
			'SELECT * FROM posts ORDER BY created_at DESC'
		);
		res.json(rows);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// **投稿詳細を取得するAPI**
app.get('/posts/:id', async (req, res) => {
	try {
		const { id } = req.params;

		// IDを数値に変換
		const parsedId = parseInt(id, 10);
		if (isNaN(parsedId)) {
			return res.status(400).json({ error: 'Invalid post ID' });
		}

		// データベースから取得
		const [rows] = await db.query('SELECT * FROM posts WHERE id = ?', [
			parsedId,
		]);

		// 投稿が見つからない場合
		if (rows.length === 0) {
			return res.status(404).json({ error: 'Post not found' });
		}

		// 投稿データを返す
		res.json(rows[0]);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// **サーバーを起動**
const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
