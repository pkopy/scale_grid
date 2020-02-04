const helpers = {};

helpers.getImg = (socketOn, socket, command, value) => {
    // console.log('socket',socketOn, command, value, socket)
    return new Promise((res, rej) => {
        if (socketOn && socket.readyState === 1) {
            // console.log(JSON.stringify({ COMMAND: command, PARAM: value }));
            socket.send(JSON.stringify({COMMAND: command, PARAM: value}));
            socket.onmessage = (e) => {
                let data = e.data;
                const response = JSON.parse(data);
                // console.log(response);

                res(response.DATA);
            };
            socket.onerror = (err) => {
                rej('noImg');
            }
        }
    })
};


helpers.findFreeSpace = (array, index, elem) => {
    // console.log('array:', array[index]);

    // console.log('row', row)
    // console.log('index:', array);
    let row = Math.floor(index / 12);
    if ((row+1)*12 - index < elem.w) {
        return false
    }
    for (let x = 0; x < elem.h; x++) {
        for (let j = index; j < elem.w + index; j++) {
            if (array[j + x * 12] || (j + x * 12) > 71) {
                // console.log('false');
                return false
            }
        }
        row++
    }


    return true
};


export default helpers