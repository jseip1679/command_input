var spawn = require('child_process').spawn
  , should = require('should');

var child = spawn('node',['./test_helper/test.prompt.helper.js']);

child.stdout.on('data', function (data) {
  data.toString().should.equal("All your base are belong to us:\n");
  child.kill();
});

child.stderr.on('data', function(data){
  console.log(data.toString());
  throw new Error("Child Process failed during testing");
});
