var command_input = require('../');

var list = ['tobi', 'loki', 'jane', 'manny', 'luna'];

command_input.choose(list, function(i){
  console.log('you chose %d "%s"', i+1, list[i]);
  process.stdin.destroy();
});
