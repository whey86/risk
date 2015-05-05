var manager = require('../../../models/control.js').manager;
 function sockethandler(socket,io){

    //Enter or create a new gamingroom
    socket.on('create', function(room, user) {
       console.log("Joined room " + room);
       socket.join(room);
       // console.log(io);
      io.to(room).emit('players',  manager.games[room].players);

   });

    socket.on('ready', function(data) {
      manager.games[data.host].players[data.name].state =  "green";
      if(manager.startGame(data.host)){
        console.log("Starting game!");
      }
      io.to(data.host).emit('players',  manager.games[data.host].players);
   });
}
module.exports.sockethandler = sockethandler;