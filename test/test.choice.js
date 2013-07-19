var spawn = require('child_process').spawn
  , should = require('should');

var child = spawn('node',['test.choice.helper.js']);
var output = '';

child.stdout.on('data', function (data) {
  output += data.toString();
});

setTimeout(function(){
  output.should.equal('  1) tobi\n  2) loki\n  3) jane\n  4) manny\n  5) luna\n  : ');
  child.kill();
},200);

