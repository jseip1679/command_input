var spawn = require('child_process').spawn
  , should = require('should');

var child = spawn('node',['test.password.helper.js']);

child.stdin.on('data', function (data) {
  data.toString().should.equal("Passsssword:\n");
});

