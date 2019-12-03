// http server

const express = require('express');
const path = require('path');
const app = express();
const {exec} = require('child_process')
const fs = require('fs')
const cors = require('cors')

app.use(cors())

app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/close', (req,res) => {
    exec('pkill chromium', (err) => {

        if (err) console.log(err)
    })
})

app.get('/getlayout', (req, res) => {
    readFile()
        .then(data => {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            const payloadString = JSON.stringify(data);
            res.end(payloadString)
        })
        .catch(err => {
            res.writeHead(400, {
                'Content-Type': 'application/json'
            });
            const payloadString = JSON.stringify(err);
            res.end(payloadString)
        })
})

console.log(__dirname + '/.data')
const readFile = () => {
    return new Promise((res, rej) => {
        fs.readFile(__dirname + '/.data/layout.json', 'utf-8', (err, data) => {
            if (!err && data) {
                const objJSON = JSON.parse(data)
                console.log(objJSON)
                res(objJSON)
            }else {
                rej(err)
            }
        })
    })
}


app.listen(9000);