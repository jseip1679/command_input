var spawn = require('child_process').spawn
  , should = require('should');

var child = spawn('node',['test.confirm.helper.js']);

child.stdout.on('data', function (data) {
  data.toString().should.equal("Are you sure you really want to do that:\n");
  child.kill();
});

