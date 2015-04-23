var host;
window.onload = function() {
	console.log("runnning");
	$("#btnCreateGame").bind('click',function(){

		host=$("#textfield").val();
		$.post("http://localhost:3000/",{host: host}, function(data){	
			console.log(data.redirect);
			window.location = data.redirect + "?host=" + data.host;
	
		});
		
	});
}

