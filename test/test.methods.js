/**
 * Module dependencies.
 */

var command_input = require('../')
  , should = require('should');

//All public methods defined in the interface should exist on the exported object
command_input.should.have.ownProperty('password');
command_input.should.have.ownProperty('prompt');
command_input.should.have.ownProperty('confirm');
command_input.should.have.ownProperty('choose');

//All private methods should be hidden.
command_input.should.not.have.property('promptSingleLine');
command_input.should.not.have.property('promptMultiLine');
command_input.should.not.have.property('promptForRegexp');
command_input.should.not.have.property('promptForDate');
command_input.should.not.have.property('promptForNumber');
