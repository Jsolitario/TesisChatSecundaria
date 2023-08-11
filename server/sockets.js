module.exports = function (io){
    
    io.on('connection', (client) =>{
        console.log('usuario conectado');

        client.on('disconnect', () =>{
            console.log('usuario desconectado');
        });
     });

}

