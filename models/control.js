var io = require('socket.io');
var Manager ={
	count : 0,
	games : null,
	addGame : function(host){
		if(Manager.games == null){
			Manager.games = new Object();
		}
		var id = host;
		Manager.count++;
		Manager.games[id] = new Object();
		Manager.games[id].players= new Array();
		Manager.games[id].name= host;
		Manager.games[id].id = id;
	

		return id;
	},
	getGameList : function(){
		var ongoinggames = [];
		var ids = keys(Manager.games);
		for (var i = 0; i < ids.length; i++) {
			ongoinggames[i]= Manager.games[ids[i]];
		};
		return ongoinggames;
	}
}
function keys(obj)
{
	var keys = [];

	for(var key in obj)
	{
		if(obj.hasOwnProperty(key))
		{
			keys.push(key);
		}
	}

	return keys;
}

module.exports.manager = Manager;
