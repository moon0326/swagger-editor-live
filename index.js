'use strict';

var path = require('path');
var serveStatic = require('serve-static');
var fs = require('fs');
var process = require('process');
var open = require('open');
var http = require('http');
var nodeModules = path.resolve(path.resolve(__dirname, ''), 'node_modules');
var app = require('connect')();


function edit(swaggerFile, port) {
  app.use('/editor/spec', function(req, res, next) {
    switch (req.method) {
      case 'GET': 
        res.end(fs.readFileSync(swaggerFile));
        break;
      case 'PUT':
          var stream = fs.createWriteStream(swaggerFile);
          req.pipe(stream);
          stream.on('finish', function() {
            res.end('ok');
            console.log("Saved changes");
          })
        break;
      default:
        return next();
        break;
    }
  });


  app.use('/', serveStatic("./"));

  var hostname = '127.0.0.1';
  var server = http.createServer(app);
  server.listen(port, hostname, function() {
    open('http://' + hostname + ':' + server.address().port);
  });
}

module.exports = {
  edit: edit
}