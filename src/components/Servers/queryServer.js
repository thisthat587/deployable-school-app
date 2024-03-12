import express, { request, response } from 'express';
// const bodyParser = require('body-parser');
import bodyParser from 'body-parser';
import connection from '../../../db.js';
// const mysql = require('mysql');

const app = express();
const PORT = 8081; // Set your desired port number

app.use(bodyParser.text()); // Using text middleware for raw body data

// const dbConfig = {
//     host: "89.117.188.154",
//     user: "u932299896_eduware",
//     password: "Webgen@220310",
//     database: "u932299896_sisdb"
// };

function query (queryString) {
    // const connection = mysql.createConnection(dbConfig);

    connection.connect();

    return new Promise((resolve, reject) => {
        connection.query(queryString, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
            connection.end();
        });
    });
}

app.post('/read', async (req, res) => {
    try {
        const queryResult = await query(req.body.toString('utf-8'));
        console.log('-'.repeat(10));
        console.log(queryResult);
        console.log('-'.repeat(10));
        res.json(queryResult);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
