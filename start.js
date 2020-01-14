// http server

const express = require('express');
const path = require('path');
const app = express();
const {exec} = require('child_process');
const fs = require('fs');
const cors = require('cors');

app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/close', (req,res) => {
    exec('sudo killall chromium-browser-v7', (err) => {

        if (err) console.log(err)
    })

});


app.get('/layout', (req, res) => {
    readFile()
        .then(data => {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            const payloadString = JSON.stringify(data);
            // console.log(payloadString)
            res.end(payloadString)
        })
        .catch(err => {
            res.writeHead(400, {
                'Content-Type': 'application/json'
            });
            const payloadString = JSON.stringify(err);
            res.end(payloadString)
        })

});



app.post('/layout', (req, res) => {
    let chunks = [];
    	req.on('data', (data) => {
		chunks.push(data)
    })
    .on('end', () => {
		let data = Buffer.concat(chunks);
		let payloadObj = JSON.parse(data);

		saveFile(payloadObj) 
                .then(() => {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    });
                
                    res.end('ok')
                })
                .catch(err => console.log(err))
	})


});

	

// console.log(__dirname + '/.data')
const readFile = () => {
    return new Promise((res, rej) => {
        fs.readFile(__dirname + '/.data/layout.json', 'utf-8', (err, data) => {
            if (!err && data) {
                const objJSON = JSON.parse(data)
                // console.log(objJSON)
                res(objJSON)
            }else {
                const data = [{"w":6,"h":4,"x":0,"y":0,"i":"b","minW":6,"maxW":12,"minH":2,"maxH":6,"moved":false,"static":true,"obj":"mass"}];

                saveFile(data)
                    .then(() => {
                        res(data)
                    })
                    .catch(err => console.log(err))
            }
        })
    })
};

const saveFile = (data) => {
    return new Promise((res, rej) => {
        const dataToJson = JSON.stringify(data);
        fs.writeFile(__dirname + '/.data/layout.json', dataToJson, (err) => {
            if(err) {
                console.log(err);

                rej(err)
            } else {
                res('OK')
            }
        })
    })

};

app.listen(8400);

