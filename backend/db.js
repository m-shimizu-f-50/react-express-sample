const mysql = require('mysql2');

const pool = mysql.createPool({
	host: 'localhost', // MAMPのMySQLサーバー（デフォルト: localhost）
	user: 'root', // MySQLのユーザー名（MAMPのデフォルトは root）
	password: 'root', // MySQLのパスワード（MAMPのデフォルトは root）
	database: 'react_node_sample', // 使用するデータベース名
	port: 8889, // MAMPのMySQLポート（デフォルトは3306 or 8889）
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
});

module.exports = pool.promise();
