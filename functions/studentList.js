
import connection from '../../../db.js';

export async function handler(event, context) {
    try {
        const queryString = `SELECT * FROM tbl_admission where session = "2023-2024" AND active = 1`;
        const result = await new Promise((resolve, reject) => {
            connection.query(queryString, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });

        return {
            statusCode: 200,
            body: JSON.stringify(result),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
}
