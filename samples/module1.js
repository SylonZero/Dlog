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
