var command_input = require('../')
  , should = require('should');

var called = false;

var cb =  function(obj){
  called = true;
};

command_input.prompt('All your base are belong to us:', cb);


process.stdin.on('data',function(chunk){
  console.log('Got Chunk', chunk);
});

process.stdin.resume();



process.stdin.write("'Hello from command_input' \n \n");
// process.stdin.setRawMode(true);
process.stdin.setEncoding('utf8');

setTimeout(function(){
      called.should.equal(true);
},7000);
