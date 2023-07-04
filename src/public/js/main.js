$(function(){
    //conexion de socket de cliente
    const socket= io();

    //obtener los elementos Dem de la interface
    const $messageForm =$('#message-form');
    const $messageBox =$('#message');
    const $chat =$('#chat');

    //obtener los datos del nickform ni terminar minuto 11:50
    const $nickForm =$('#nickForm');
    const $nickError =$('#nickError');
    const $nickname =$('#nickname');

    const $user =$('#usernames');

    $nickForm.submit(e => {
        e.preventDefault();
        socket.emit('new user', $nickname.val(), data => {
            //ocultar y mostrar contenedores de HTML
            if($nickname.val().length !=0){    
                if (data){
                  $('#nickWrap').hide()
                 $('#ContenedorApp').show();
                 }else {
                     $nickError.html(`
                         <div class="alert alert-danger">
                            El nombre de usuario ya existe
                        </div>
                         `);
                }
                $nickname.val('');
            }else{
                $nickError.html(`<div class="alert alert-danger">Debe ingresar un nombre</div>`);
            }
        });
    });
    
    //Eventos 

    // enviar mensaje
    $messageForm.submit(e=>{
        e.preventDefault();
        socket.emit('send message',$messageBox.val(),data => {
            $chat.append(`<p class="error">${data}</p>`)
        });
        $messageBox.val('');
    });

    //mostrar mensajes enviados
    socket.on('new message',function(data){
        $chat.append('<b>'+data.nick + '</b>: ' + data.msg +'<br/>');
    });


    // mostrar usuarios conectados con funcion
    socket.on('nombres', function(data) {
        //console.log("llego antes del let de funtion");
        let html = '';
        for (let i =0; i <data.length; i++ ){
            html += `<p>${data[i]}</p>`
            console.log(data[i]);
        }
        $user.html(html);
    });
    
    socket.on('whisper', function (data) {
        $chat.append(`<p class="whisper"><b>${data.nick}:</b> ${data.msg} </p>`)
    });

    
    socket.on("cargar mesajes viejos", msgs =>{
        for (let i = 0; i < msgs.length; i++) {
            displayMsg(msgs[i]);
        }
    })

    function displayMsg(data) {
        $chat.append(`<p class="whisper"><b>${data.nick}:</b> ${data.msg} </p>`);
    }



    // mostrar usuarios conectados  (falla)
    /*   
    socket.on('usernames', data => {
        console.log("llego antes del let");
        let html = '';
        for (let i =0; i <length.data; i++ ){
            console.log("si llego a esta parte");
            html += `<p>${data[i]}</p>`
        }
        $user.html(html); 
    });
    */
})


