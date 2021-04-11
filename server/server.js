const app = require('./app');
const http = require('http').Server(app);
global.io = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

const port = process.env.PORT || 3001;
http.listen(port, () => {
    console.log(`SERVER RUNNNING at port=${port}`);
});
