'use strict';

var path = require('path');
var serveStatic = require('serve-static');
var fs = require('fs');
var process = require('process');
var open = require('open');
var http = require('http');
var nodeModules = path.resolve(path.resolve(__dirname, ''), 'node_modules');
var swaggerEditorPath = path.resolve(nodeModules, 'swagger-editor');
var app = require('connect')();

function edit(swaggerFile, port) {
  app.use('/editor/spec', function(req, res, next) {
    if (req.method !== 'PUT') { return next(); }
    var stream = fs.createWriteStream(swaggerFile);
    req.pipe(stream);
    stream.on('finish', function() {
      res.end('ok');
      console.log("Saved changes");
    })
  });

  app.use('/editor/spec', serveStatic(swaggerFile) );
  app.use('/config/defaults.json', function(req, res, next) {
    if (req.method !== 'GET') { return next(); }
    res.end(JSON.stringify({
      analytics: { google: { id: null } },
      disableCodeGen: true,
      disableNewUserIntro: true,
      examplesFolder: '/spec-files/',
      exampleFiles: [],
      autocompleteExtension: {},
      useBackendForStorage: true,
      backendEndpoint: '/editor/spec',
      backendHealthCheckTimeout: 5000,
      useYamlBackend: true,
      disableFileMenu: true,
      enableTryIt: true,
      headerBranding: false,
      brandingCssClass: null,
      schemaUrl: '/schema/swagger.json',
    }));
  });

  app.use('/', serveStatic(swaggerEditorPath));

  var hostname = '127.0.0.1';
  var server = http.createServer(app);
  server.listen(port, hostname, function() {
    open('http://' + hostname + ':' + server.address().port + '/#/edit');
  });
}

module.exports = {
  edit: edit
}