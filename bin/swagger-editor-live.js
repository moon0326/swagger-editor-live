#!/usr/bin/env node
'use strict';

var program = require('commander');
var fs = require('fs');
var swaggerFilePathValue;

program
    .version('1.0')
    .arguments('<swaggerFilePath>')
    .option('-p, --port <port>', 'Port to be used. Default is 8000')
    .option('-h, --host <Hostname|Ip>', 'Host to be used. Default is 127.0.0.1')
    .option('-f, --folder <folder>', 'folder to be used for a multifile swagger setup')
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
if (typeof program.host === 'undefined') {
    program.host = "127.0.0.1";
}

if (fs.existsSync(swaggerFilePathValue)) {
    require("../index.js").edit(swaggerFilePathValue, program.port,program.host,program.folder);
} else {
    console.error(swaggerFilePathValue + " does not exist.");
}