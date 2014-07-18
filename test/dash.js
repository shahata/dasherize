'use strict';

var test = require('tape');
var dasherize = require('../');

var obj = {
  feeFieFoe: 'fum',
  beepBoop: [
    { abcXyz: 'mno' },
    { fooBar: 'baz' }
  ]
};

test('dasherize a nested object', function (t) {
  t.plan(1);
  var res = dasherize(obj);
  t.deepEqual(res, {
    'fee-fie-foe': 'fum',
    'beep-boop': [
      { 'abc-xyz': 'mno' },
      { 'foo-bar': 'baz' }
    ]
  });
});

test('string', function (t) {
  t.plan(1);
  t.equal(dasherize('oneTwo'), 'one-two');
});

test('date', function (t) {
  t.plan(1);
  var d = new Date();
  t.equal(dasherize(d), d);
});

test('regex', function (t) {
  t.plan(1);
  var r = /1234/;
  t.equal(dasherize(r), r);
});

test('only dasherize strings that are the root value', function (t) {
  t.plan(2);
  t.equal(dasherize('fooBar'), 'foo-bar');
  var res = dasherize({ fooBar: 'baz-foo' });
  t.deepEqual(res, { 'foo-bar': 'baz-foo' });
});
