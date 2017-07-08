#!/usr/bin/env node
'use strict';

var program = require('commander');
var fs = require('fs');
var swaggerFilePathValue;

program
    .version('1.0')
    .arguments('<swaggerFilePath>')
    .option('-p, --port <port>', 'Port to be used. Default is 8000')
    .action(function(swaggerFilePath) {
        swaggerFilePathValue = swaggerFilePath;
    });

program.parse(process.argv);

if (typeof swaggerFilePathValue === 'undefined') {
    console.error("<swaggerFilePathValue> is required. swagger-editor-live <swaggerFilePathValue> ");
    process.exit(1);
}

if (typeof program.port === 'undefined') {
    program.port = 8000;
}

if (fs.existsSync(swaggerFilePathValue)) {
    require("../index.js").edit(swaggerFilePathValue, program.port);
} else {
    console.error(swaggerFilePathValue + " does not exist.");
}