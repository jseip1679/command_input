# Command_Input.js


## Installation

    $ npm install command_input

## .prompt(msg, fn)

 Single-line prompt:

```js
program.prompt('name: ', function(name){
  console.log('hi %s', name);
});
```

 Multi-line prompt:

```js
program.prompt('description:', function(name){
  console.log('hi %s', name);
});
```

 Coercion:

```js
program.prompt('Age: ', Number, function(age){
  console.log('age: %j', age);
});
```

```js
program.prompt('Birthdate: ', Date, function(date){
  console.log('date: %s', date);
});
```

```js
program.prompt('Email: ', /^.+@.+\..+$/, function(email){
  console.log('email: %j', email);
});
```

## .password(msg[, mask], fn)

Prompt for password without echoing:

```js
program.password('Password: ', function(pass){
  console.log('got "%s"', pass);
  process.stdin.destroy();
});
```

Prompt for password with mask char "*":

```js
program.password('Password: ', '*', function(pass){
  console.log('got "%s"', pass);
  process.stdin.destroy();
});
```

## .confirm(msg, fn)

 Confirm with the given `msg`:

```js
program.confirm('continue? ', function(ok){
  console.log(' got %j', ok);
});
```

## .choose(list, fn)

 Let the user choose from a `list`:

```js
var list = ['tobi', 'loki', 'jane', 'manny', 'luna'];

console.log('Choose the coolest pet:');
program.choose(list, function(i){
  console.log('you chose %d "%s"', i, list[i]);
});
```

## Links

 - [API documentation](http://visionmedia.github.com/commander.js/)
 js/tree/master/examples)

## License

(The MIT License)

Copyright (c) 2013 Jake Seip jake.seip@gmail.com  TJ Holowaychuk tj@vision-media.ca;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
