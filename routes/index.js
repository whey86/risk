var express = require('express');
var router = express.Router();
var session = require('express-session');
var manager = require('../models/control.js').manager;
var io = require('socket.io');
/* GET home page. */
router.get('/', function(req, res, next) {
	var games = manager.getGameList();
	res.render('index',{gameslist : games});
});
router.post('/',function(req,res){
  var host = req.body.host;
  var id = manager.addGame(host);

res.send({redirect: '/lobby', host:host});
});

/* GET home page. */
router.get('/lobby', function(req, res, next) {
	var host = req.query.host;
	res.render('./lobby');
});



module.exports = router;
