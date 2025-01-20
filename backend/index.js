/*
 * ライブラリの読み込み
 */
const express = require('express');
const cors = require('cors'); // クロスオリジンリクエスト（異なるドメイン間の通信）を許可するミドルウェア。
const axios = require('axios'); // HTTPクライアントライブラリ

/*
 * expressアプリケーションの生成
 */
const app = express(); // expressアプリケーションを生成(インスタンス化)
const PORT = 5001; // サーバーを動かすポート番号（ここでは 5000 を指定）。

/*
 * ミドルウェアの設定
 * フロントエンド（React）が http://localhost:3000 で動作し、バックエンド（Express）が http://localhost:5000 で動作すると、異なるオリジン（ドメイン・ポート）間での通信が発生するため、CORS の許可が必要になる。
 */
app.use(cors()); // CORS（Cross-Origin Resource Sharing）を許可するための設定。
app.use(express.json()); // expressアプリケーションでJSONを扱うための設定。

// JSONPlaceholder API からデータ取得
app.get('/api/posts', async (req, res) => {
	try {
		const response = await axios.get(
			'https://jsonplaceholder.typicode.com/posts'
		);
		res.json(response.data);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// サーバーを起動
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
