// functions/getQuery.js

// Import the necessary modules for database connection
import { createConnection } from 'mysql2';

// Define the handler function for the Netlify function
export async function handler(event, context) {
    try {
        // Parse the incoming request body
        const { admno, userID, PIN } = JSON.parse(event.body);

        // Create a database connection
        const connection = createConnection({
            host: "89.117.188.154",
            user: "u932299896_eduware",
            password: "Webgen@220310",
            database: "u932299896_sisdb",
        });

        // Connect to the database
        await connection.connect();

        // Construct the SQL query to insert data into tbl_stdLogin
        const queryString = `INSERT INTO tbl_stdLogin (admno, uid, pass) VALUES ('${admno}', '${userID}', '${PIN}')`;

        // Execute the database query
        await connection.promise().query(queryString);

        // Close the database connection
        connection.end();

        // Return a successful response
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Data inserted successfully' }),
        };
    } catch (error) {
        // Handle any errors
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
}
