const helpers = {};

helpers.getImg = (socketOn, socket, command, value) => {
    // console.log(socketOn, command, value, socket)
    return new Promise((res, rej) => {
        if (socketOn && socket.readyState === 1) {
            // console.log(JSON.stringify({ COMMAND: command, PARAM: value }));
            socket.send(JSON.stringify({ COMMAND: command, PARAM: value }));
            socket.onmessage = (e) => {
                let data = e.data;
                const response = JSON.parse(data);
                // console.log(response);
                res(response.DATA);
            };
            socket.onerror = (err) => {
                res('noImg');
            }
        }
    })
};



export default helpers