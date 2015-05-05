function UIControl(c){
	var self =this;
	this.ratio;
	this.ctx;
	this.myCanvas;
	this.control = c;


	this.setTurn = function(player){
		$('#titleTurn').text(player.name);
		$('#titleTurn').css('color',"#"+ player.color);
	};
	this.setPhase = function(phase){
		$('#titlePhase').text(phase);
	};
	this.setMessage = function(message){
		$('#infoBox').text(message);
	}

	this.addInfoPanel = function(){
		$("#playersTop").append('<div id="scorepanel"></div>');
		// $("#scorepanel").append('<div id="score1"></div>');
		$("#scorepanel").append("<h1 id='titleTurn' class='score'></h1>");
		// $("#scorepanel").append('<div id="score2"></div>');
		$("#scorepanel").append("<h1 id='titlePhase' class='score'></h1>");
		$("#scorepanel").append('<div id="score3"></div>');
		$("#score3").append("<p id='infoBox'class='score'>Some info</p>");


	/*$("#scorepanel").append(scorePanelData.toggleTitleHTML);
	$("#toggleTitle ").append(scorePanelData.toggleTitle);
	$("#scorepanel").append(scorePanelData.toggleColorHTML);

	$(".toggle-btn:not('.noscript') input[type=radio]").addClass("visuallyhidden");
	$(".toggle-btn:not('.noscript') input[type=radio]").change(function() {
		if( $(this).attr("name") ) {
			$(this).parent().addClass("success").siblings().removeClass("success")
		} else {
			$(this).parent().toggleClass("success");
		}
	});
	$(".toggle-btn:not('.noscript') input[type=radio]").bind('click', function(){
		console.log($(this).attr('id'));
		if($(this).attr('id') == 'toggleOn'){
			highlighting.alwaysOn =true;
		}else if($(this).attr('id') == 'toggleOff'){
			highlighting.alwaysOn =false;
		}
		for (var i = 0; i < 42; i++) {
				var pos = $("#terr"+i).attr('title');
			var pos2 = pos.split(" ");
			var color =  self.control.getColor(parseInt(pos2[0]),parseInt(pos2[1]));
			highlighting.setTerritoriumColor("#terr"+i,color);
		};
		$('#playboard').maphilight();
	});

	$('#nextPhase').bind('click',function(){
		console.log(self.control.getGameData());*/
	/*	gameData.gamePhase++;
		if(gameData.gamePhase>4){
			gameData.turn = (gameData.turn+1)%4;
			gameData.gamePhase=0;
		} 
		$('#titleTurn').text(gameData.players[gameData.turn].name);
		$('#titleTurn').css('color',"#"+ gameData.players[gameData.turn].color);
		$('#titlePhase').text(gameData.gamePhases[gameData.gamePhase]);
		$('#titlePhase').css('color',"white");*/
	// });

};

this.addBoard = function(){

	$("#boardContainer").append(map);
	for (var i = 0; i < 42; i++) {
		$("#Map").append($(area1[i]).attr('id','terr' + i));

		// var pos = $("#terr"+i).attr('title');
		// var pos2 = pos.split(" ");
		// var color =  self.control.getColor(parseInt(pos2[0]),parseInt(pos2[1]));
		// highlighting.setTerritoriumColor("#terr"+i,'AAAAAA');

	};
	
	$('#playboard').maphilight();
	// $('img[usemap]').rwdImageMaps();
 /* var $span=$('<span class="map_title">'+"30 Units"+'</span>');        
        $span.css({top: 200+'px', left: 200+'px', color : 'purple', "font-size" : '40px', position:'absolute'});
        $span.appendTo('#boardContainer');*/
    }
    this.setupBoard = function(){

    	this.addInfoPanel();


    	this.addBoard();
	//Create canvas with the device resolution.
	// selfmyCanvas = createHiDPICanvas(800, 540);
	// this.addOverlayCanvas();
}

this.addInputPanel = function(){
	
	$("#playersBottom").append('<div id="input1"></div>');
	$("#input1").append("<button id='btnDone' class='score btnStyle' >Done</button>");
	panel.fadeIn("#btnDone",function(){});
}
this.openAttackPanel = function(control,attackunits,defunits){
	panel.close();
	panel.fadeOut("#btnDone",function(){
		$("#btnDone").remove();

	});
	panel.fadeOut("#playersTop *",function(){
		$("#playersTop *").remove();
		panel.attack(self,control,attackunits,defunits);

	});


}
this.openMovePanel = function(control){
	panel.close();
	panel.fadeOut("#btnDone",function(){
		$("#btnDone").remove();

	});
	panel.fadeOut("#playersTop *",function(){
		$("#playersTop *").remove();
		
		$("#playersTop").append("<h1>Movement</h1>");

		$("#playersBottom").append('<div id="unitsContainer"/>');
		$('#unitsContainer').append("<button id='btnSub' class='btnStyle btnA' >-</button>");
		$('#unitsContainer').append("<h1 id='attackingUnits' class='btnA'>1</h1>");
		$('#unitsContainer').append("<button id='btnAdd' class='btnStyle'btnA >+</button>");
		$('#playersBottom').append("<button id='btnEndBattle' class='btnStyle' >End</button>");
		$('#btnAdd').bind('click', function(){
			var value =	parseInt($('#attackingUnits').text());
			if(control.maxAttack(value)){
				alert("You dont have so many units");
				return;
			}
			$('#attackingUnits').text(''+(value+1) );
		});
		$('#btnSub').bind('click', function(){
			var value =	parseInt($('#attackingUnits').text());
			if(value==1){
				alert("You must transfer atlest one unit");
				return;
			};
			$('#attackingUnits').text(''+(value-1) );
		});
		$('#btnEndBattle').bind('click', function(){
			panel.fadeOut("#playersTop *",function(){});
			panel.fadeOut("#playersBottom *",function(){
		
					var val = parseInt($('#attackingUnits').text());
					control.winTransfer(val);
					control.getCurrentPlayer().moves--;
				

				panel.open(function(){

					$('#playersTop *').remove();
					$('#playersBottom *').remove();
					self.addInfoPanel();
					control.updateScorePanel();
					control.updateTerritoryUI();
					control.activateDone();
				});
			});

		});
	});
}
this.drawTerritoryStats = function(x, y, units,base,hero,color){
	console.log("APPENDING " +base);
// $("#boardContainer").append("<p class='.terrtoryUnits'>"+units+"</p>").css({
// 	'top' :'y',
// 	'left' :'x'
// })

var ctx = $("#boardContainer div canvas")[0].getContext("2d");
         // var ctx = c;
      // ctx.clearRect ( x-7 , y-22 ,35,35);
      // ctx.fillRect(x-7 , y-22 ,35,35);
      if(base==true){
      	ctx.beginPath();
      	// ctx.arc(100, 100, 50, 0, 2 * Math.PI, false);
      	ctx.arc(x+10, y-5, 15, 0, 2 * Math.PI, false);
      	if(color == "" || color ==null){
      		color="ffffff";
      	}
      	ctx.fillStyle = '#'+color;
      	ctx.fill();
      	ctx.lineWidth = 1;
      	ctx.strokeStyle = '#003300';
      	ctx.stroke();
      }



      if(hero==true){
      	ctx.fillStyle = '#FFD700';
      }else{
      	ctx.fillStyle = 'white';
      }
      if(units != 0 || units != null){
      	ctx.beginPath();
      	ctx.font = "15px Sans-serif"

      	ctx.fillText(units, x, y);
      	ctx.lineWidth = 1;
      	ctx.strokeStyle = '#003300';
      	ctx.stroke();

      }

  }
  this.addOverlayCanvas = function(){
  	$('<canvas>').attr({
  		id: 'overlayCanvas'
  	}).css({
  		width: 800  + 'px',
  		height: 540 + 'px',
  		position : 'absolute',
  	}).appendTo("#boardContainer div");
  }
}
/*var PIXEL_RATIO = (function () {
	var ctx =   $("#myCanvas");
	console.log(ctx);
	dpr = window.devicePixelRatio || 1,
	bsr = ctx.webkitBackingStorePixelRatio ||
	ctx.mozBackingStorePixelRatio ||
	ctx.msBackingStorePixelRatio ||
	ctx.oBackingStorePixelRatio ||
	ctx.backingStorePixelRatio || 1;

	return dpr / bsr;
})();
var createHiDPICanvas = function(w, h, ratio) {
	if (!ratio) { ratio = PIXEL_RATIO; }
	var can =   $("#myCanvas");
	can.width = w * ratio;
	can.height = h * ratio;
	can.style.width = w + "px";
	can.style.height = h + "px";
	can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
	// $(can).attr('id', 'overlayCanvas2');
	return can;
}*/