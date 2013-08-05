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

child.stdin.end('1\n\n'); //May or may not be needed to kill child
child.stdin.destroy(); //May or may not be needed to kill child

child.stderr.on('data', function(data){
  throw new Error(data);
});


//Adding force kill for travis-CI
setTimeout(function(){ //May or may not be needed to kill child
  child.kill();//May or may not be needed to kill child
  process.exit();//May or may not be needed to kill child
}, 1000);
