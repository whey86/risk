var socket; 
window.onload = function() {
    socket = io('http://localhost:3000');


    socket.on('hi', function (data) {
        alert(data);
    });

   

}