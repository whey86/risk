var express = require('express');
var router = express.Router();
var session = require('express-session');
var manager = require('../models/control.js').manager;

/* GET home page. */
router.get('/', function(req, res, next) {
	var games = manager.getGameList();
	res.render('index',{gameslist : games});
});
router.post('/',function(req,res){
	console.log("post post");
  var host = req.body.host;
  var name = req.body.name;
  var id = manager.addGame(host,name);
  
res.send({redirect: '/lobby', host:host, name:name});
});

/* GET home page. */
router.get('/lobby', function(req, res, next) {
	var host = req.query.host;
	res.render('./lobby');
});



module.exports = router;
