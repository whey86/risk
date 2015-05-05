var host;
var name;
window.onload = function() {
	console.log("runnning");
	$("#btnCreateGame").bind('click',function(){
		name=$("#namefield").val();
		if(name == ""){
			alert("Enter a name");
			return;
		}
		host=$("#hostfield").val();
		$.post("http://localhost:3000/",{host: host, name : name}, function(data){	
			console.log(data.redirect);
			window.location = data.redirect + "?host=" + data.host + "&name="+data.name;

		});
		
	});
	$("li").bind('click',function(){
		name=$("#namefield").val();
		if(name == ""){
			alert("Enter a name");
			return;
		}
		host=$(this).text();
		$.post("http://localhost:3000/",{host: host, name:name}, function(data){	
				window.location = data.redirect + "?host=" + data.host + "&name="+data.name;

		});
		
	});	
}

