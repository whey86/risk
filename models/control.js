
var Manager ={
	//Number of active games
	count : 0,
	//Object holdning all the active games
	games : null,
	//Method adding a new game or adding a player to a game
	addGame : function(host,player){
		var id = host;
		if(Manager.games == null){
			Manager.games = new Object();
		}
		if(Manager.games[id] == null){
			Manager.count++;
			Manager.games[id] = new Object();
			Manager.games[id].players = new Object();
		}

		

		var cPlayer= new Object();
		cPlayer.name = player;

		cPlayer.state = 'red';


		Manager.games[id].players[player] = cPlayer;
		// Manager.games[id].name= host;
		Manager.games[id].id = id;
		// Manager.games[id].model = new Freemap;
		return id;
	},
	getGameList : function(){
		var ongoinggames = [];
		var ids = keys(Manager.games);
		for (var i = 0; i < ids.length; i++) {
			ongoinggames[i]= Manager.games[ids[i]].id;
		};
		return ongoinggames;
	},
	startGame : function(host){
		var ids = keys(Manager.games[host].players);
		for (var i = 0; i < ids.length; i++) {
			if("red" == Manager.games[host].players[ids[i]].state){
				return false;
			}
		};
		return true;
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
