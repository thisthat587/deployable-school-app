import { createConnection } from 'mysql2';

export const handler = async (event, context) => {
    try {
        // Create a database connection
        const connection = createConnection({
            host: "89.117.188.154",
            user: "u932299896_eduware",
            password: "Webgen@220310",
            database: "u932299896_sisdb",
        });

        // Connect to the database
        await connection.connect();

        // Execute a database query
        const [rows] = await connection.promise().query('SELECT * FROM tbl_stdLogin');
        // console.log(rows)
        // Close the database connection
        connection.end();

        // Construct the response body
        const responseBody = {
            message: rows,
            event,
            context
        };

        // Return the response
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(responseBody)
        };
    } catch (error) {
        // Handle any errors
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
    }
};