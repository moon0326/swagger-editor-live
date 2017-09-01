'use strict';

var path = require('path');
var fs = require('fs');
var open = require('open');
var nodeModules = path.resolve(path.resolve(__dirname, ''), 'node_modules');
if (!fs.existsSync(nodeModules)) {
  nodeModules = path.resolve('node_modules');
}
var express = require('express');
var app = express();

function edit(swaggerFile, port, hostname,folder) {

  app.get('/', function(req, res) {
    res.sendFile(__dirname + "/index.html");
  });

  app.get('/swagger-editor.css', function(req, res) {
    res.sendFile(nodeModules + "/swagger-editor-dist/swagger-editor.css");
  });

  app.get('/swagger-editor-bundle.js', function(req, res) {
    res.sendFile(nodeModules + "/swagger-editor-dist/swagger-editor-bundle.js");
  });

  app.get('/swagger-editor-standalone-preset.js', function(req, res) {
    res.sendFile(nodeModules + "/swagger-editor-dist/swagger-editor-standalone-preset.js");
  });

  app.get('/editor/spec', function(req, res) {
    res.send(fs.readFileSync(swaggerFile));
  });

  app.put('/editor/spec', function(req, res) {
    var stream = fs.createWriteStream(swaggerFile);
    req.pipe(stream);
    stream.on('finish', function() {
      res.send('ok');
      console.log("Saved changes");
    })
  });
  if (typeof folder != 'undefined') {
    app.use(express.static(folder));
  }
  app.listen(port,hostname, function() {
    open('http://' + hostname + ':' + port);
  });
}

module.exports = {
  edit: edit
}