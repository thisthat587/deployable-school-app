import express from 'express';
import cors from 'cors';
import connection from '../../../db.js';


const app = express();
// app.use(express.static('dist'));
app.use(cors())
app.use(express.json())

setInterval(() => {
    connection.query(`select 1`);
}, 10000)

app.get('/loginDetails', (request, response) => {
    const queryString = `SELECT * FROM tbl_stdLogin`;
    connection.query(queryString, (error, result) => {
        return response.json(result)
    })
})

app.get('/studentList', (request, response) => {
    const queryString = `SELECT * FROM tbl_admission where session = "2023-2024" AND active = 1`;
    connection.query(queryString, (error, result) => {
        return response.json(result)
    })
})

app.post('/getQuery', (request, response) => {

    const dataFromBody = [request.body.admno, request.body.userID, request.body.PIN];

    const queryString = `INSERT INTO tbl_stdLogin (admno, uid, pass) VALUES ('${dataFromBody[0]}', '${dataFromBody[1]}', '${dataFromBody[2]}');`
    connection.query(queryString);

});

app.post('/updateName', (request, response) => {

    const dataFromBody = [request.body.name, request.body.admno];

    const queryString = `UPDATE tbl_admission SET name = '${dataFromBody[0]}' WHERE admno = '${dataFromBody[1]}';`
    connection.query(queryString);

});

app.post('/updatefName', (request, response) => {

    const dataFromBody = [request.body.fname, request.body.admno];

    const queryString = `UPDATE tbl_admission SET fname = '${dataFromBody[0]}' WHERE admno = '${dataFromBody[1]}';`
    connection.query(queryString);

});


app.get('/transportFee', (request, response) => {
    const queryString = `select admno, transportfee from tbl_stdfeemaster where session = '2023-2024'`
    connection.query(queryString, (error, result) => {
        return response.json(result)
    })
})

app.get('/destination', (request, response) => {
    const queryString = `select admno, destination from tbl_stdtransdetail`;
    connection.query(queryString, (error, result) => {
        return response.json(result)
    })
})

app.listen(8081, () => {
    console.log(`serve at http://localhost:8081`);
})
