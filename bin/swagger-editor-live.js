#!/usr/bin/env node
'use strict';

var program = require('commander');
var fs = require('fs');
var swaggerFilePathValue;

program
    .version('1.0')
    .arguments('<swaggerFilePath>')
    .action(function(swaggerFilePath) {
        swaggerFilePathValue = swaggerFilePath;
    });

program.parse(process.argv);


if (typeof swaggerFilePathValue === 'undefined') {
    console.error("<swaggerFilePathValue> is required. swagger-editor-live <swaggerFilePathValue> ");
    process.exit(1);
}

if (fs.existsSync(swaggerFilePathValue)) {
    require("../index.js").edit(swaggerFilePathValue);
} else {
    console.error(swaggerFilePathValue + " does not exist.");
}