import express from 'express';
import cors from 'cors';
import Serverless from 'serverless-http';

import { createConnection } from "mysql2";

const connection = createConnection({
    host: "89.117.188.154",
    user: "u932299896_eduware",
    password: "Webgen@220310",
    database: "u932299896_sisdb",
})

const router = express.Router();

const app = express();
// app.use(express.static('dist'));
app.use(cors())
app.use(express.json())

setInterval(() => {
    connection.query(`select 1`);
}, 10000)

router.get('/loginDetails', (request, response) => {
    const queryString = `SELECT * FROM tbl_stdLogin`;
    connection.query(queryString, (error, result) => {
        return response.json(result)
    })
})

router.get('/studentList', (request, response) => {
    const queryString = `SELECT * FROM tbl_admission where session = "2023-2024" AND active = 1`;
    connection.query(queryString, (error, result) => {
        return response.json(result)
    })
})

router.post('/getQuery', (request, response) => {

    const dataFromBody = [request.body.admno, request.body.userID, request.body.PIN];

    const queryString = `INSERT INTO tbl_stdLogin (admno, uid, pass) VALUES ('${dataFromBody[0]}', '${dataFromBody[1]}', '${dataFromBody[2]}');`
    connection.query(queryString);

});

router.post('/updateName', (request, response) => {

    const dataFromBody = [request.body.name, request.body.admno];

    const queryString = `UPDATE tbl_admission SET name = '${dataFromBody[0]}' WHERE admno = '${dataFromBody[1]}';`
    connection.query(queryString);

});

router.post('/updatefName', (request, response) => {

    const dataFromBody = [request.body.fname, request.body.admno];

    const queryString = `UPDATE tbl_admission SET fname = '${dataFromBody[0]}' WHERE admno = '${dataFromBody[1]}';`
    connection.query(queryString);

});


router.get('/transportFee', (request, response) => {
    const queryString = `select admno, transportfee from tbl_stdfeemaster where session = '2023-2024'`
    connection.query(queryString, (error, result) => {
        return response.json(result)
    })
})

router.get('/destination', (request, response) => {
    const queryString = `select admno, destination from tbl_stdtransdetail`;
    connection.query(queryString, (error, result) => {
        return response.json(result)
    })
})

app.use(`/.netlify/functions/server`, router)
module.exports = app;
module.exports.handler = Serverless(app);
// app.listen(8081, () => {
//     console.log(`serve at http://localhost:8081`);
// })


// /loginDetails
// /studentList
// /getQuery
// /updateName
// /updatefName
// /transportFee
// /destination