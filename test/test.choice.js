var spawn = require('child_process').spawn
  , should = require('should');

var child = spawn('node',['test.choice.helper.js']);
var output = '';

 child.on('exit', function(){
  output.should.equal('  1) tobi\n  2) loki\n  3) jane\n  4) manny\n  5) luna\n  : you chose 1 "tobi"\n');
});

child.stdout.on('data', function (data) {
  output += data.toString();
});

child.stdin.end('1\n\n');

child.stderr.on('data', function(data){
  throw new Error(data);
});

child.on('exit', function(){
  output.should.equal('  1) tobi\n  2) loki\n  3) jane\n  4) manny\n  5) luna\n  : you chose 1 "tobi"\n');
});

//Adding force kill for travis-CI 
setTimeout(function(){
  child.kill();
}, 1000);
