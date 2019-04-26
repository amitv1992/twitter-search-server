var Jasmine = require('jasmine');
var HtmlReporter = require('jasmine-pretty-html-reporter').Reporter;
var path = require('path')

var jasmine = new Jasmine();

jasmine.loadConfigFile('spec/support/jasmine.json');

// options object
jasmine.addReporter(new HtmlReporter({
  path: path.join(__dirname,'results')
}));

jasmine.execute();

//Run NOTE: You have to run this file in node if you want to generate reporters.
/* In this particular situation you command is "node spec/spec-runner.js". Add this to script to 
make it a npm command.*/

/*This applies to all the Reporters where in you declare a configuration file such as this one
and run this file instead of directly running jasmine command in terminal*/