var spawn = require('child_process').spawn
  , should = require('should');

var child = spawn('node',['test.password.helper.js']);

child.stdout.on('data', function (data) {
  data.toString().should.equal("Password:");
  child.stdin.end(); // redundant but necessary for Travis-ci
});

child.stderr.on('data', function(data){
  throw new Error(data);
});
