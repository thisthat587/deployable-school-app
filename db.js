import { createConnection } from "mysql2";

const connection = createConnection({
    host: "89.117.188.154",
    user: "u932299896_eduware",
    password: "Webgen@220310",
    database: "u932299896_sisdb",
})

function sendQueryString (query) {
    const queryString = query;
}
export default connection; 