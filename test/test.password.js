var spawn = require('child_process').spawn
  , should = require('should');

var child = spawn('node',['./test_helper/test.password.helper.js']);

child.stdout.on('data', function (data) {
  data.toString().should.equal("Password:");
  child.kill();
});

child.stderr.on('data', function(data){
  console.log(data.toString());
  throw new Error("Child Process failed during testing");
});
