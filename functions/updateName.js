// functions/updateName.js

// Import the necessary modules for database connection
import { createConnection } from 'mysql2';

// Define the handler function for the Netlify function
export async function handler(event, context) {
    try {
        // Parse the incoming request body
        const { name, admno } = JSON.parse(event.body);

        // Create a database connection
        const connection = createConnection({
            host: "89.117.188.154",
            user: "u932299896_eduware",
            password: "Webgen@220310",
            database: "u932299896_sisdb",
        });

        // Connect to the database
        await connection.connect();

        // Construct the SQL query to update the name in tbl_admission
        const queryString = `UPDATE tbl_admission SET name = '${name}' WHERE admno = '${admno}'`;

        // Execute the database query
        await connection.promise().query(queryString);

        // Close the database connection
        connection.end();

        // Return a successful response
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Name updated successfully' }),
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
