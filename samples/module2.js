var logger2 = dlog('module2');

function someFunc3() {
  logger2('someFunc3 is doing some stuff here');
}

function someFunc4() {
  logger2('someFunc4 is doing stuff here...');
}

someFunc3();
someFunc4();
