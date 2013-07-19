/*!
 * command_input
 * Copyright(c) 2013 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var keypress = require('keypress')
  , tty = require('tty');


// all public methods
var CommandInput = {};

// all private methods
var prompts = {};

/**
 * Prompt for a `Number`.
 *
 * @param {String} str
 * @param {Function} fn
 * @api private
 */

prompts.promptForNumber = function(str, fn){
  prompts.promptSingleLine(str, function parseNumber(val){
    val = Number(val);
    if (isNaN(val)) return prompts.promptSingleLine(str + '(must be a number) ', parseNumber);
    fn(val);
  });
};

/**
 * Prompt for a `Date`.
 *
 * @param {String} str
 * @param {Function} fn
 * @api private
 */

prompts.promptForDate = function(str, fn){
  prompts.promptSingleLine(str, function parseDate(val){
    val = new Date(val);
    if (isNaN(val.getTime())) return prompts.promptSingleLine(str + '(must be a date) ', parseDate);
    fn(val);
  });
};


/**
 * Prompt for a `Regular Expression`.
 *
 * @param {String} str
 * @param {Object} pattern regular expression object to test
 * @param {Function} fn
 * @api private
 */

 prompts.promptForRegexp = function(str, pattern, fn){
  prompts.promptSingleLine(str, function parseRegexp(val){
    if(!pattern.test(val)) return prompts.promptSingleLine(str + '(regular expression mismatch) ', parseRegexp);
    fn(val);
  });
};


/**
 * Single-line prompt.
 *
 * @param {String} str
 * @param {Function} fn
 * @api private
 */

 prompts.promptSingleLine = function(str, fn){
  // determine if the 2nd argument is a regular expression
  if (arguments[1].global !== undefined && arguments[1].multiline !== undefined) {
    return prompts.promptForRegexp(str, arguments[1], arguments[2]);
  } else if ('function' == typeof arguments[2]) {
    return prompts['promptFor' + (fn.name || fn)](str, arguments[2]);
  }

  process.stdout.write(str);
  process.stdin.setEncoding('utf8');
  process.stdin.once('data', function(val){
    fn(val.trim());
  }).resume();
};

/**
 * Multi-line prompt.
 *
 * @param {String} str
 * @param {Function} fn
 * @api private
 */

prompts.promptMultiLine = function(str, fn){
  var buf = [];
  console.log(str);
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', function(val){
    if ('\n' == val || '\r\n' == val) {
      process.stdin.removeAllListeners('data');
      fn(buf.join('\n'));
    } else {
      buf.push(val.trimRight());
    }
  }).resume();
};

/**
 * Prompt `str` and callback `fn(val)`
 *
 * Command_Input supports single-line and multi-line prompts.
 * To issue a single-line prompt simply add white-space
 * to the end of `str`, something like "name: ", whereas
 * for a multi-line prompt omit this "description:".
 *
 *
 * Examples:
 *
 *     program.prompt('Username: ', function(name){
 *       console.log('hi %s', name);
 *     });
 *
 *     program.prompt('Description:', function(desc){
 *       console.log('description was "%s"', desc.trim());
 *     });
 *
 * @param {String|Object} str
 * @param {Function} fn
 * @api public
 */

CommandInput.prompt = function(str, fn){
  if ('string' == typeof str) {
    if (/ $/.test(str)) return prompts.promptSingleLine.apply(this, arguments);
    prompts.promptMultiLine(str, fn);
  } else {
    var keys = Object.keys(str)
      , obj = {};

    function next() {
      var key = keys.shift()
        , label = str[key];

      if (!key) return fn(obj);
      CommandInput.prompt(label, function(val){
        obj[key] = val;
        next();
      });
    }

    next();
  }
};

/**
 * Prompt for password with `str`, `mask` char and callback `fn(val)`.
 *
 * The mask string defaults to '', aka no output is
 * written while typing, you may want to use "*" etc.
 *
 * Examples:
 *
 *     program.password('Password: ', function(pass){
 *       console.log('got "%s"', pass);
 *       process.stdin.destroy();
 *     });
 *
 *     program.password('Password: ', '*', function(pass){
 *       console.log('got "%s"', pass);
 *       process.stdin.destroy();
 *     });
 *
 * @param {String} str
 * @param {String} mask
 * @param {Function} fn
 * @api public
 */

CommandInput.password = function(str, mask, fn){
  var buf = '';

  // default mask
  if ('function' == typeof mask) {
    fn = mask;
    mask = '';
  }

  keypress(process.stdin);

  function setRawMode(mode) {
    if (process.stdin.setRawMode) {
      process.stdin.setRawMode(mode);
    } else {
      tty.setRawMode(mode);
    }
  };
  setRawMode(true);
  process.stdout.write(str);

  // keypress
  process.stdin.on('keypress', function(c, key){
    if (key && 'enter' == key.name) {
      console.log();
      process.stdin.pause();
      process.stdin.removeAllListeners('keypress');
      setRawMode(false);
      if (!buf.trim().length) return CommandInput.password(str, mask, fn);
      fn(buf);
      return;
    }

    if (key && key.ctrl && 'c' == key.name) {
      console.log('%s', buf);
      process.exit();
    }

    process.stdout.write(mask);
    buf += c;
  }).resume();
};

/**
 * Confirmation prompt with `str` and callback `fn(bool)`
 *
 * Examples:
 *
 *      program.confirm('continue? ', function(ok){
 *        console.log(' got %j', ok);
 *        process.stdin.destroy();
 *      });
 *
 * @param {String} str
 * @param {Function} fn
 * @api public
 */


CommandInput.confirm = function(str, fn, verbose){
  CommandInput.prompt(str, function(ok){
    if (!ok.trim()) {
      if (!verbose) str += '(yes or no) ';
      return CommandInput.confirm(str, fn, true);
    }
    fn(parseBool(ok));
  });
};

/**
 * Choice prompt with `list` of items and callback `fn(index, item)`
 *
 * Examples:
 *
 *      var list = ['tobi', 'loki', 'jane', 'manny', 'luna'];
 *
 *      console.log('Choose the coolest pet:');
 *      program.choose(list, function(i){
 *        console.log('you chose %d "%s"', i, list[i]);
 *        process.stdin.destroy();
 *      });
 *
 * @param {Array} list
 * @param {Number|Function} index or fn
 * @param {Function} fn
 * @api public
 */

CommandInput.choose = function(list, index, fn){
  var hasDefault = 'number' == typeof index;

  if (!hasDefault) {
    fn = index;
    index = null;
  }

  list.forEach(function(item, i){
    if (hasDefault && i == index) {
      console.log('* %d) %s', i + 1, item);
    } else {
      console.log('  %d) %s', i + 1, item);
    }
  });

  function again() {
    CommandInput.prompt('  : ', function(val){
      val = parseInt(val, 10) - 1;
      if (hasDefault && isNaN(val)) val = index;

      if (null == list[val]) {
        again();
      } else {
        fn(val, list[val]);
      }
    });
  }

  again();
};

/**
 * Parse a boolean `str`.
 *
 * @param {String} str
 * @return {Boolean}
 * @api private
 */

var parseBool = function(str) {
  return /^y|yes|ok|true$/i.test(str);
};


/**
 * Expose the root CommandInput.
 */

exports = module.exports = CommandInput;
