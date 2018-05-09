var logger = dlog('module1');

function someFunc() {
  var numValue = 50;
  logger('someFunc is doing some stuff here', numValue);
}

function someFunc2() {
  var objValue = {
    stuff1: true,
    numValue: 25
  };
  logger('someFunc2 is doing stuff here...', objValue);
}

someFunc();
someFunc2();

// Code representing the need to log something new with an inline namespace
dlog('InlineModule', 'This is from an inline call to dlog', 'With additional args');
