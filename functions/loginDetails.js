// loginDetails.js

// Import the necessary modules or mechanisms for database connection
import connection from '../db.js';

// Define the handler function for the Netlify function
export async function handler(event, context) {
    try {
        // Construct the SQL query to fetch login details
        const queryString = `SELECT * FROM tbl_stdLogin`;

        // Execute the query
        const result = await new Promise((resolve, reject) => {
            connection.query(queryString, (error, rows) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(rows);
                }
            });
        });

        // Ensure the result is an array
        const data = Array.isArray(result) ? result : [];

        // Return the result as a JSON response
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        // Handle any errors that occur during execution
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
}
