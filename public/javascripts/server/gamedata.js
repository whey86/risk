var gameData = {
	//Number of players
	playerSize : null,
	//Array with player data
	players: null,
	//Startphases
	startPhases : ["Place your base", "Add reinforcement", "Add hero on friendly territory"],
	//Current startphase, if over 2, startphase is over
	startPhase : 0,
	//Diffrent phases of the game
	gamePhases : ["Deployment", "Attack", "Achievment", "Movement"],
	//Currrent gamephase
	gamePhase : 0,
	turn : 0,
	baseCount : 0,
	heroCount : 0,
	unitCount : [],
	map : null,
	//Starting units for number of players -> 3, 4 ,5 , 6
	startUnits : [30,25,20,15],
	unitsOut :0,
	max : [30*3,25*4,20*5,15*6],
	message : "   ",
	startOfTurn : true,


	attacking : 0,


}
var players = [
{color: "AA00FF", race : "zerg", name: "", taken: false, moves : 0},
{color: "FF6D00", race : "protoss", name: "", taken: false, moves : 0},
{color: "2962FF", race : "terran", name: "", taken: false, moves : 0},
{color: "D50000", race : "terran", name: "", taken: false, moves : 0},
{color: "FFEB3B", race : "protoss", name: "", taken: false, moves : 0},
{color: "795548", race : "zerg", name: "", taken: false, moves : 0}
]
var player = {
	name : null,
	faction : null,
}
var mapskelleton = {
	size: null,
	premade: false,
	area : new Array(),
}
var territorySkelleton = {
	name : null, color : null, hero : false, units : 0, adjacent : [{area : 0, territory : 0}] 
}
var freemap = {
		order : null,
		size : null,
		premade: false,
		mapSize : 42,
		area : [
		{
			name : "Char",
			bonus : 7,
			territories : [
			{ name : "Char aleph", color : "", hero : false, units : 0, middle:[89,103], adjacent : [{area : 0, territory : 1}, {area : 0, territory : 2},{area : 0, territory : 8},{area : 0, territory : 9}] },
			{ name : "Glass flats", color : "", hero : false, units : 0 , middle:[183,90], adjacent : [{area : 0, territory : 1}, {area : 0, territory : 2},{area : 0, territory : 8},{area : 0, territory : 9}]},
			{ name : "Burning rift", color : "", hero : false, units : 0 , middle:[168,135], adjacent : [{area : 0, territory : 1}, {area : 0, territory : 2},{area : 0, territory : 8},{area : 0, territory : 9}]},
			{ name : "Death valley", color : "", hero : false, units : 0 , middle:[243,111], adjacent : [{area : 0, territory : 1}, {area : 0, territory : 2},{area : 0, territory : 8},{area : 0, territory : 9}]},
			{ name : "Bone trench", color : "", hero : false, units : 0 , middle:[282,159], adjacent : [{area : 0, territory : 1}, {area : 0, territory : 2},{area : 0, territory : 8},{area : 0, territory : 9}]},
			{ name : "Dauntless plateau", color : "", hero : false, units : 0 , middle:[285,215], adjacent : [{area : 0, territory : 1}, {area : 0, territory : 2},{area : 0, territory : 8},{area : 0, territory : 9}]},
			{ name : "Hells gates", color : "", hero : false, units : 0 , middle:[252,282], adjacent : [{area : 0, territory : 1}, {area : 0, territory : 2},{area : 0, territory : 8},{area : 0, territory : 9}]},
			{ name : "Nydus network", color : "", hero : false, units : 0 , middle:[204,236], adjacent : [{area : 0, territory : 1}, {area : 0, territory : 2},{area : 0, territory : 8},{area : 0, territory : 9}]},
			{ name : "Primary hive cluster", color : "", hero : false, units : 0 , middle:[145,212], adjacent : [{area : 0, territory : 1}, {area : 0, territory : 2},{area : 0, territory : 8},{area : 0, territory : 9}]},
			{ name : "Acid marsh", color : "", hero : false, units : 0 , middle:[93,195], adjacent : [{area : 0, territory : 1}, {area : 0, territory : 2},{area : 0, territory : 8},{area : 0, territory : 9}]},
			{ name : "Eris", color : "", hero : false, units : 0 , middle:[193,318], adjacent : [{area : 0, territory : 1}, {area : 0, territory : 2},{area : 0, territory : 8},{area : 0, territory : 9}]},
			{ name : "Ate", color : "", hero : false, units : 0, middle:[343,264], adjacent : [{area : 0, territory : 1}, {area : 0, territory : 2},{area : 0, territory : 8},{area : 0, territory : 9}] }
			]
		},
		{
			name : "Korhal",
			bonus : 5,
			territories : [
			{ name : "Wolfrec province", color : "", hero : false, units : 0, middle:[395,58], adjacent : [{area : 0, territory : 1}, {area : 0, territory : 2},{area : 0, territory : 8},{area : 0, territory : 9}] },
			{ name : "Keresh province", color : "", hero : false, units : 0 , middle:[465,125], adjacent : [{area : 0, territory : 1}, {area : 0, territory : 2},{area : 0, territory : 8},{area : 0, territory : 9}]},
			{ name : "Augustgrad", color : "", hero : false, units : 0 , middle:[374,143], adjacent : [{area : 0, territory : 1}, {area : 0, territory : 2},{area : 0, territory : 8},{area : 0, territory : 9}]},
			{ name : "Radiated wastes", color : "", hero : false, units : 0 , middle:[319,158], adjacent : [{area : 0, territory : 1}, {area : 0, territory : 2},{area : 0, territory : 8},{area : 0, territory : 9}]},
			{ name : "Ruins of styrling", color : "", hero : false, units : 0 , middle:[386,219], adjacent : [{area : 0, territory : 1}, {area : 0, territory : 2},{area : 0, territory : 8},{area : 0, territory : 9}]},
			{ name : "Ursa", color : "", hero : false, units : 0, middle:[487,233], adjacent : [{area : 0, territory : 1}, {area : 0, territory : 2},{area : 0, territory : 8},{area : 0, territory : 9}]},
			{ name : "Canis", color : "", hero : false, units : 0 , middle:[511,64], adjacent : [{area : 0, territory : 1}, {area : 0, territory : 2},{area : 0, territory : 8},{area : 0, territory : 9}]},
			]

		},
		{
			name : "Aiur",
			bonus : 5,
			territories : [
			{ name : "Saalok", color : "", hero : false, units : 0, middle:[579,142], adjacent : [{area : 0, territory : 1}, {area : 0, territory : 2},{area : 0, territory : 8},{area : 0, territory : 9}] },
			{ name : "Temple of the preservers", color : "", hero : false, units :0 , middle:[572,224], adjacent : [{area : 0, territory : 1}, {area : 0, territory : 2},{area : 0, territory : 8},{area : 0, territory : 9}]},
			{ name : "The great forum", color : "", hero : false, units : 0 , middle:[602,266], adjacent : [{area : 0, territory : 1}, {area : 0, territory : 2},{area : 0, territory : 8},{area : 0, territory : 9}]},
			{ name : "Antioch province", color : "", hero : false, units : 0, middle:[655,300], adjacent : [{area : 0, territory : 1}, {area : 0, territory : 2},{area : 0, territory : 8},{area : 0, territory : 9}]},
			{ name : "Scion province", color : "", hero : false, units : 0 , middle:[671,254], adjacent : [{area : 0, territory : 1}, {area : 0, territory : 2},{area : 0, territory : 8},{area : 0, territory : 9}]},
			{ name : "Remains of the overmind", color : "", hero : false, units : 0 , middle:[696,217], adjacent : [{area : 0, territory : 1}, {area : 0, territory : 2},{area : 0, territory : 8},{area : 0, territory : 9}]},
			{ name : "Feral hives", color : "", hero : false, units : 0 , middle:[695,170], adjacent : [{area : 0, territory : 1}, {area : 0, territory : 2},{area : 0, territory : 8},{area : 0, territory : 9}]},

			{ name : "Velari province", color : "", hero : false, units : 0 , middle:[624,196], adjacent : [{area : 0, territory : 1}, {area : 0, territory : 2},{area : 0, territory : 8},{area : 0, territory : 9}]},
			{ name : "Citadel of the executor", color : "", hero : false, units : 0 , base : false, middle:[643,159], adjacent : [{area : 0, territory : 1}, {area : 0, territory : 2},{area : 0, territory : 8},{area : 0, territory : 9}]},

			]
		},
		//3
		{
			name : "Zerus",
			bonus : 2,
			territories : [
			{ name : "The eternal scar", color : "", hero : false, units : 0, base : false, middle:[187,393], adjacent : [{area : 0, territory : 1}, {area : 0, territory : 2},{area : 0, territory : 8},{area : 0, territory : 9}] },
			{ name : "Sun valley", color : "", hero : false, units : 0 , middle:[215,434], adjacent : [{area : 0, territory : 1}, {area : 0, territory : 2},{area : 0, territory : 8},{area : 0, territory : 9}]},
			{ name : "Fulmic highlands", color : "", hero : false, units : 0 , middle:[144,438], adjacent : [{area : 0, territory : 1}, {area : 0, territory : 2},{area : 0, territory : 8},{area : 0, territory : 9}]},
			{ name : "Volatile cleft", color : "", hero : false, units : 0 , middle:[193,484], adjacent : [{area : 0, territory : 1}, {area : 0, territory : 2},{area : 0, territory : 8},{area : 0, territory : 9}]}
			]
		},
		//4
		{
			name : "Mar sara",
			bonus : 3,
			territories : [
			{ name : "Thisby", color : "", hero : false, units : 0, middle:[313,465], adjacent : [{area : 0, territory : 1}, {area : 0, territory : 2},{area : 0, territory : 8},{area : 0, territory : 9}] },
			{ name : "Backwater station", color : "", hero : false, units : 0, base : false , middle:[387,445], adjacent : [{area : 0, territory : 1}, {area : 0, territory : 2},{area : 0, territory : 8},{area : 0, territory : 9}]},
			{ name : "Diamondback wastelands", color : "", hero : false, units : 0, middle:[350,366], adjacent : [{area : 0, territory : 1}, {area : 0, territory : 2},{area : 0, territory : 8},{area : 0, territory : 9}] },
			{ name : "Riksville", color : "", hero : false, units : 0, middle:[452,411], adjacent : [{area : 0, territory : 1}, {area : 0, territory : 2},{area : 0, territory : 8},{area : 0, territory : 9}] },
			{ name : "Jacobs installation", color : "", hero : false, units : 0 , middle:[404,314], adjacent : [{area : 0, territory : 1}, {area : 0, territory : 2},{area : 0, territory : 8},{area : 0, territory : 9}]},
			{ name : "Pyramus", color : "", hero : false, units : 0 , middle:[484,346], adjacent : [{area : 0, territory : 1}, {area : 0, territory : 2},{area : 0, territory : 8},{area : 0, territory : 9}]},
			]
		},
		{
			name : "Shakuras",
			bonus : 2,
			territories : [
			{ name : "Rajal", color : "", hero : false, units : 0, base : false, middle:[559,483], adjacent : [{area : 0, territory : 1}, {area : 0, territory : 2},{area : 0, territory : 8},{area : 0, territory : 9}] },
			{ name : "Katuul province", color : "", hero : false, units : 0 , middle:[581,408], adjacent : [{area : 0, territory : 1}, {area : 0, territory : 2},{area : 0, territory : 8},{area : 0, territory : 9}]},
			{ name : "Talematros", color : "", hero : false, units :0 , middle:[640,372], adjacent : [{area : 0, territory : 1}, {area : 0, territory : 2},{area : 0, territory : 8},{area : 0, territory : 9}]},
			{ name : "Xelnaga temple grounds", color : "", hero : false, units : 0, middle:[639,446], adjacent : [{area : 0, territory : 1}, {area : 0, territory : 2},{area : 0, territory : 8},{area : 0, territory : 9}] }
			]
		}
		]


	};


var maps = [
	// Three players
	{},
	//Four players
	{
		order : [3,4,0,2],
		size : 4,
		premade: false,
		mapSize : 42,
		area : [
		{
			name : "Char",
			bonus : 7,
			territories : [
			{ name : "Char aleph", color : "AA00FF", hero : false, units : 2, adjacent : [{area : 0, territory : 1}, {area : 0, territory : 2},{area : 0, territory : 8},{area : 0, territory : 9}] },
			{ name : "Glass flats", color : "AA00FF", hero : false, units : 2 },
			{ name : "Burning rift", color : "AA00FF", hero : false, units : 2 },
			{ name : "Death valley", color : "2962FF", hero : false, units : 5 },
			{ name : "Bone trench", color : "FFEB3B", hero : false, units : 1 },
			{ name : "Dauntless plateau", color : "2962FF", hero : false, units : 1 },
			{ name : "Hells gates", color : "2962FF", hero : false, units : 2 },
			{ name : "Nydus network", color : "FFEB3B", hero : false, units : 2 },
			{ name : "Primary hive cluster", color : "2962FF", hero : false, units : 1 },
			{ name : "Acid marsh", color : "2962FF", hero : false, units : 1 },
			{ name : "Eris", color : "FFEB3B", hero : false, units : 2 },
			{ name : "Ate", color : "2962FF", hero : false, units : 1 }
			]
		},
		{
			name : "Korhal",
			bonus : 5,
			territories : [
			{ name : "Wolfrec province", color : "AA00FF", hero : false, units : 2 },
			{ name : "Keresh province", color : "FFEB3B", hero : false, units : 3 },
			{ name : "Augustgrad", color : "D50000", hero : false, units : 3 },
			{ name : "Radiated wastes", color : "FFEB3B", hero : false, units : 3 },
			{ name : "Ruins of styrling", color : "D50000", hero : false, units : 3 },
			{ name : "Ursa", color : "D50000", hero : false, units : 3},
			{ name : "Canis", color : "AA00FF", hero : false, units : 2 },
			]

		},
		{
			name : "Aiur",
			bonus : 5,
			territories : [
			{ name : "Saalok", color : "FFEB3B", hero : false, units : 2 },
			{ name : "Temple of the preservers", color : "FFEB3B", hero : false, units : 2 },
			{ name : "The great forum", color : "AA00FF", hero : false, units : 3 },
			{ name : "Antioch province", color : "D50000", hero : false, units : 2 },
			{ name : "Scion province", color : "AA00FF", hero : false, units : 2 },
			{ name : "Remains of the overmind", color : "AA00FF", hero : false, units : 2 },
			{ name : "Feral hives", color : "D50000", hero : false, units : 1 },

			{ name : "Velari province", color : "AA00FF", hero : false, units : 2 },
			{ name : "Citadel of the executor", color : "AA00FF", hero : false, units : 3 , base : true},

			]
		},
		//3
		{
			name : "Zerus",
			bonus : 2,
			territories : [
			{ name : "The eternal scar", color : "2962FF", hero : false, units : 4, base : true },
			{ name : "SundeD50000 valley", color : "2962FF", hero : false, units : 4 },
			{ name : "Fulmic highlands", color : "2962FF", hero : false, units : 1 },
			{ name : "Volatile cleft", color : "D50000", hero : false, units : 2 }
			]
		},
		//4
		{
			name : "Mar sara",
			bonus : 3,
			territories : [
			{ name : "Thisby", color : "D50000", hero : false, units : 1 },
			{ name : "Backwater station", color : "D50000", hero : false, units : 2, base : true },
			{ name : "Diamondback wastelands", color : "D50000", hero : false, units : 3 },
			{ name : "Riksville", color : "D50000", hero : false, units : 5 },
			{ name : "Jacobs installation", color : "2962FF", hero : false, units : 3 },
			{ name : "Pyramus", color : "FFEB3B", hero : false, units : 2 },
			]
		},
		{
			name : "Shakuras",
			bonus : 2,
			territories : [
			{ name : "Rajal", color : "FFEB3B", hero : false, units : 4, base : true },
			{ name : "Katuul province", color : "FFEB3B", hero : false, units : 4 },
			{ name : "Talematros", color : "AA00FF", hero : false, units : 2 },
			{ name : "Xelnaga temple grounds", color : "2962FF", hero : false, units : 2 }
			]
		}
		]


	}
	
	]
