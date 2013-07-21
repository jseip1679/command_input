var command_input = require('../');

command_input.confirm('Are you sure you really want to do that?:', function(ok){
  command_input.stdin.destroy();
});
