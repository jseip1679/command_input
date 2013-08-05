var spawn = require('child_process').spawn
  , should = require('should');

var child = spawn('node',['test.prompt.helper.js']);

child.stdout.on('data', function (data) {
  data.toString().should.equal("All your base are belong to us:\n");
  child.stdin.end(); // redundant but necessary for Travis-ci
  child.kill();
});

child.stderr.on('data', function(data){
  throw new Error(data);
});
