var command_input = require('../')
  , should = require('should');


var called = false;

var cb =  function(obj){
  called = true;
};

command_input.prompt('All your base are belong to us:', cb);

process.stdin.write("'Hello from command_input' \n \n");

setTimeout(function(){
      called.should.equal(true);
},1000);
