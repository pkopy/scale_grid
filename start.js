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

app.get('/layout', (req, res) => {
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

// app.post('/layout', (req, res) => {
//     req.on('data', (data) => {
//         // let payloadObj;
//         try {
//             let payload = Buffer.from(data).toString();
//             let payloadObj = JSON.parse(payload)
//             saveFile(payloadObj) 
//                 .then(() => {
//                     res.writeHead(200, {
//                         'Content-Type': 'application/json'
//                     });
                
//                     res.end('ok')
//                 })
//                 .catch(err => {
//                     console.log(err)
//                     res.writeHead(200, {
//                         'Content-Type': 'application/json'
//                     });
                
//                     res.end(err)
                
//                 })
//         } catch {
//             console.log('Not saved')
//         }
//         // console.log(payloadObj)

        
        
//     })
// })

app.post('/layout', (req, res) => {
    let chunks = [];
    	req.on('data', (data) => {
		chunks.push(data)
    })
    .on('end', () => {
		let data = Buffer.concat(chunks)
		let payloadObj = JSON.parse(data)
		saveFile(payloadObj) 
                .then(() => {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    });
                
                    res.end('ok')
                })
                .catch(err => console.log(err))
	})

})
	

console.log(__dirname + '/.data')
const readFile = () => {
    return new Promise((res, rej) => {
        fs.readFile(__dirname + '/.data/layout.json', 'utf-8', (err, data) => {
            if (!err && data) {
                const objJSON = JSON.parse(data)
                // console.log(objJSON)
                res(objJSON)
            }else {
                rej(err)
            }
        })
    })
}

const saveFile = (data) => {
    return new Promise((res, rej) => {
        const dataToJson = JSON.stringify(data)
        fs.writeFile(__dirname + '/.data/layout.json', dataToJson, (err) => {
            if(err) {
                console.log(err)
                rej(err)
            } else {
                res('OK')
            }
        })
    })
}


app.listen(9000)