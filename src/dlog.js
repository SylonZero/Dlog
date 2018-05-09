function dlog(namespace) {
  var self = this;

  if(self.dlog) self = this.dlog;
  
  if(namespace && namespace.trim() !== '' &&
      !self.namespaces.hasOwnProperty(namespace)) {
    self.namespaces[namespace] = {
      active: true,
      style: {
        fontSize: '10pt',
        color: 'red'
      }
    };
  }
  
  // You can use the function inline with a namespace or get a memoized wrapper...
  if(arguments.length > 1) {
    var remainingArgs = Array.from(arguments);
    remainingArgs.splice(0,1);
    
    self.log(namespace, remainingArgs);
  } else {
    return function() {
      self.log(namespace, arguments);
    }    
  }
}

dlog.namespaces = {
  module1: {
    active: false,
    style: {
      fontSize: '10pt',
      color: 'gray'
    }
  },
  module2: {
    active: true,
    style: {
      fontSize: '10pt',
      color: 'green'
    }
  }
};

dlog.showOnly = [];

dlog.log = function(namespace, args) {
  var self = this;
  var tNamespace = self.namespaces['default'];
  var outputThis = false;
  
  argArray = Array.from(args);
  
  if(namespace) {
    tNamespace = self.namespaces[namespace];
  }
  
  if(tNamespace) {
    outputThis = tNamespace.active;
    
    if(self.showOnly && self.showOnly.length > 0) {
      outputThis = (self.showOnly.indexOf(namespace) !== -1);
    }
    
    if(!outputThis) return;
    
    if(tNamespace.style) {
      console.log('%c' + namespace + ': ', 
        'color: ' + tNamespace.style.color + ';font-size: ' + tNamespace.style.fontSize);
      
      argArray.forEach(function(tArg) {
        console.log.call(console, '%c' + JSON.stringify(tArg), 
        'color: ' + tNamespace.style.color + ';font-size: ' + tNamespace.style.fontSize);
      });
    } else {
      console.log(namespace + ': ');
      
      argArray.forEach(function(tArg) {
        console.log(JSON.stringify(tArg));
      });
    }
  }
}
