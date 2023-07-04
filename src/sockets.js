const Chat = require ('./modelos/Chat')

module.exports = function (io){

// cambiar a objetos  0:00 - 24:minutos 
let users = {};

    //conexion de servidor del socket

    io.on('connection',async socket=> {
        console.log('nuevo usuario conectado');

        //funcion de inicio de seccion nuevos usuarios
        let mensajesviejos = await Chat.find({});
        socket.emit('cargar mesajes viejos', mensajesviejos);

        socket.on('new user', (data,cb)=> {
            if (data in users) {
                cb(false);
            } else {
                cb(true);
                //console.log('si verifico su existencia');
                socket.nickname = data;
                //console.log(data);
                users[socket.nickname] = socket;
                 //users.push(socket.nickname);
                //io.sockets.emit('nombres',nicknames);
                //console.log(nicknames);
                updateusers();
            }
        });

        //funcion de enviar mensaje (actualizar minuto 33:20)
        
        socket.on('send message', async (data, cb) => {
            var msg = data.trim();


            if (msg.substr(0,3) === '/w '){
                msg = msg.substr(3);
                const index = msg.indexOf(' ');
                if (index !== -1){
                    var name = msg.substring(0, index);
                    var msg = msg.substring(index + 1);
                        if (name in users){
                            users[name].emit('whisper', {
                                msg,
                                nick: socket.nickname
                            });
                        }else{
                            cb('Error, ingresa un usuario valido');
                        }
                }else {
                    cb('Error, ingresa tu mensaje');
                }    
            }else {
                var newMsg = new Chat({
                    msg,
                    nick: socket.nickname
                });
                await newMsg.save(); 
                
                io.sockets.emit('new message', {
                    msg: data,
                    nick: socket.nickname
                });
            }  
        });
        
        //funcion en la desconexion de usuarios
        
        socket.on('disconnect', data=>{
            if (!socket.nickname) return;
            delete users[socket.nickname];
            updateusers();
        });
        
        //Actualisar usuarios
        
        function updateusers(){
            io.sockets.emit('nombres',Object.keys(users));
        }
        
    });

}
