const helpers = {};
helpers.arr = []
helpers.getImg = (socketOn, socket, command, value, arr) => {

    return new Promise((res, rej) => {
        if (socketOn && socket.readyState === 1) {
            socket.send(JSON.stringify({COMMAND: command, PARAM: value}));
            socket.onmessage = (e) => {
                let data = e.data;
                const response = JSON.parse(data);
                console.log(response)
                if (response.DATA) {
                    // socket.close()
                    res(response);
                } else {
                    // socket.close()
                    res(response);
                }
            };
            // socket.onerror = (err) => {
            //     rej('noImg');
            // }
        }
    })
};


helpers.findFreeSpace = (array, index, elem) => {
    let row = Math.floor(index / 12);
    if ((row + 1) * 12 - index < elem.w) {
        return false
    }
    for (let x = 0; x < elem.h; x++) {
        for (let j = index; j < elem.w + index; j++) {
            if (array[j + x * 12] || (j + x * 12) > 71) {
                return false
            }
        }
        row++
    }


    return true
};

helpers.scroll = (node, step = 20, directionUp = false) => {
    directionUp ? node.scrollTop -= step : node.scrollTop += step;
};


export default helpers