// loginDetails.js

// Import the necessary modules or mechanisms for database connection
import connection from '../../../db.js';

// Define the handler function for the Netlify function
export async function handler(event, context) {
    try {
        // Construct the SQL query to fetch login details
        const queryString = `SELECT * FROM tbl_stdLogin`;

        // Execute the query
        const result = await new Promise((resolve, reject) => {
            connection.query(queryString, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });

        // Return the result as a JSON response
        return {
            statusCode: 200,
            body: JSON.stringify(result),
        };
    } catch (error) {
        // Handle any errors that occur during execution
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
}
