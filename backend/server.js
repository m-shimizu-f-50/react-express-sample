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

// **サーバーを起動**
const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
