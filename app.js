
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
   , https = require('https')
 // , jq = require('jquery')
  , url = require('url')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

var html='';
app.post('/getRss',function(req,res){
  	var u = req.query.u;
  if(u.indexOf('https')<0){
    var tempArr = u.split('http://');
    var n = tempArr[1].indexOf('/');
    var host = tempArr[1].substring(0,n);
    path = tempArr[1].substring(n,tempArr[1].length);
    var options={
      	'host':host,
      	'port':80,
      	'path':path,
      	'method':'get'
    };
    http.get(options, function(resx) {
     	 resx.on('data', function(data) {
        		 html+=data;
      	}).on('end',function(){
        		res.writeHead(200, {"Content-Type": "text/html"});
        		res.write(html);
        		res.end()
     	 });
    });
  }else{
  	var html = '';
  	https.get(u, function(resx) {
   		 resx.on('data', function(d) {
     			html += d+"<br>";
    		}).on('end',function(){
  			 res.writeHead(200, {"Content-Type": "text/html"});
  			res.write(html);
  			res.end()
  		});
  	}).on('error', function(e) {
    		console.error(e);
  	});  	
  }
});
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
