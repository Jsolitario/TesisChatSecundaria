module.exports = function (io){


let nicknames = [];

    //conexion de servidor del socket

    io.on('connection',socket=> {
        //console.log('nuevo usuario conectado');

        //funcion de inicio de seccion nuevos usuarios

        socket.on('new user', (data,cb)=> {
            if (nicknames.indexOf(data) != -1) {
                cb(false);
            } else {
                cb(true);
                //console.log('si verifico su existencia');
                socket.nickname = data;
                //console.log(data);
                nicknames.push(socket.nickname);
                //io.sockets.emit('nombres',nicknames);
                //console.log(nicknames);
                updateusers();
            }
        });

        //funcion de enviar mensaje (actualizar minuto 33:20)
        
        socket.on('send message', function (data) {
            io.sockets.emit('new message', {
                msg: data,
                nick: socket.nickname
            });
            
        });
        
        //funcion en la desconexion de usuarios
        
        socket.on('disconnect', data=>{
            if (!socket.nickname) return;
            nicknames.splice(nicknames.indexOf(socket.nickname),1);
            updateusers();
        });
        
        //Actualisar usuarios
        
        function updateusers(){
            io.sockets.emit('nombres',nicknames);
        }
        
    });

}
