const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 3000;

// ustawienia połączenia z bazą danych
const connectionSettings = {
	host: 'db',
	user: 'root',
	password: 'example',
	database: 'mydb',
};

app.get('/', async (req, res) => {
	try {
		const connection = await mysql.createConnection(connectionSettings);
		const [rows, fields] = await connection.execute('SELECT * FROM test');

		connection.end();

		// res.send('<h1>no siemka</h1>');
		res.json(rows);
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
});

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
