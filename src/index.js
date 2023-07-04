const http = require('http');
const path = require('path');

const express = require('express');
const {Server} = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

//seting  (Configuaraciones )
app.set('port',process.env.PORT || 3000);

require('./sockets')(io);

// static files (archivos que no cambian )
app.use(express.static(path.join(__dirname,'public')));

// starting the server (inicio de servidor)
server.listen(app.get('port'),()=>{
    console.log('Server on port',+ app.get('port'));
});
