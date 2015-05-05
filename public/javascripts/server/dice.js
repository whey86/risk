var dice = {
	sides : 6,
	rollDice : function(){
		return Math.floor((Math.random() * dice.sides) + 1);
	},
	//Rolls muliple dices and returns array with result
	rollMulti : function(number){
		var array = new Array(number);

		for (var i = 0; i < number; i++) {
			array[i] = dice.rollDice();
		};
		return array;
	}
}

