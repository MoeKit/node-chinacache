var restify = require('restify');
var config = require('./config.json');
var server = restify.createServer({
	name: 'node-chinacache',
	version: '1.0.0'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/', function(req, res, next) {
	res.send('hello');
	return next();
});

server.get('/api/v1/refresh', function(req, res, next) {
	var restler = require('restler');
	var API = 'https://r.chinacache.com/content/refresh';
	restler.postJson(API, {
		username: config.username,
		password: config.password,
		task: {
			urls: ["http://scdn.bozhong.com/source/www/css/2014.css"],
			dirs: [],
			callback: {
				url: "",
				email: [],
				acptNotice: true
			}
		}
	}).on('complete', function(data) {
		res.send(data);
		return next();
	});
});

server.get('/api/v1/list', function(req, res, next) {
	res.send(req.params);
	return next();
});

server.post('/api/v1/_callback', function(req, res, next) {
	res.send('hi');
	return next();
});

server.listen(config.port, function() {
	console.log('%s listening at %s', server.name, server.url);
});