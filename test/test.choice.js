var spawn = require('child_process').spawn
  , should = require('should');

var child = spawn('node',['./test_helper/test.choice.helper.js']);
var output = '';

child.stdout.on('data', function(data) {
  output += data.toString();
});

child.stdin.write('1\n\n');

child.on('exit', function(){
  output.should.equal('  1) tobi\n  2) loki\n  3) jane\n  4) manny\n  5) luna\n  : you chose 1 "tobi"\n');
});

child.stderr.on('data', function(data){
  console.log(data.toString());
  throw new Error("Child Process failed during testing");
});
