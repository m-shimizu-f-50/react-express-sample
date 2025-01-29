# React-Express Sample

このプロジェクトは、React（フロントエンド）と Express（バックエンド）を使用して、MySQL データベースから投稿データを取得・管理するサンプルアプリです。

## 📌 特徴

- **フロントエンド**: React（Hooks & Redux Toolkit Query を活用）
- **バックエンド**: Express（API サーバー）
- **データベース**: MySQL（MAMP を使用）
- **スタイリング**: TailwindCSS
- **API**: JSONPlaceholder → MySQL へ移行済み

## 🚀 機能

- 投稿一覧の取得
- 特定の投稿の詳細取得
- 新しい投稿の作成
- 投稿の編集
- 投稿の削除
- React-Redux（RTK Query）による API 状態管理

---

## 🛠️ セットアップ

### ** バックエンド（Express + MySQL）**

#### **必要な環境**

- [Node.js](https://nodejs.org/)
- [MAMP](https://www.mamp.info/en/)（MySQL サーバー）

#### **インストール & 起動**

```sh
# 必要なパッケージをインストール
cd backend
npm install

# サーバーを起動
 node server.js
```

```sh
# 必要なパッケージをインストール
cd frontend
npm install

# 起動
 npm run dev
```
