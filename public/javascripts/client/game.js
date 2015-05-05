var socket; 

window.onload = function() {
	socket = io('http://localhost:3000');
	var host = getParameterByName('host');
	var name= getParameterByName('name');

	console.log(host);
	console.log(name);

	socket.emit('create',host,name);

	socket.on('players',function(data){
		console.log(data);
		var ids = keys(data);
		$("#gamecontainer").empty();
		for (var i = 0; i < ids.length; i++) {
			$("#gamecontainer").append("<h2 style='color : "+data[ids[i]].state+"'>"+data[ids[i]].name+"</h2>");
		};
	});
	socket.on('start',function(){
	
	});

	$("#btnReady").bind('click',function(){
		socket.emit('ready',{host:host,name:name});
	});



}
function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
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