function dlog(namespace) {
    var self = this;

    if (self.dlog) self = this.dlog;

    // Init namespace storage
    // Add a sample namespace called default
    if (!self.namespaces) self.namespaces = {
        default: {
            active: false,
            style: {
                fontSize: '10pt',
                color: '#63666A'
            }
        }
    };

    // Init override array
    if (!self.showOnly) self.showOnly = [];

    // Init filter message flag
    // This is a flag that is used to display a one-time message about what logs
    // are being filtered to display
    if (!self.hasOwnProperty('filterMessageShown')) {
        self.filterMessageShown = false;
    }

    if (namespace && namespace.trim() !== '' && !self.namespaces.hasOwnProperty(namespace)) {
        self.namespaces[namespace] = {
            active: true,
            style: {
                fontSize: '8pt',
                color: '#63666A'
            }
        };
    }

    // You can use the function inline with a namespace or get a memoized wrapper...
    if (arguments.length > 1) {
        var remainingArgs = Array.from(arguments);
        remainingArgs.splice(0, 1);

        self.log(namespace, remainingArgs);
    } else {
        return function () {
            self.log(namespace, arguments);
        }
    }
}

dlog.log = function (namespace, args) {
    var self = this;
    var tNamespace = self.namespaces['default'];
    var outputThis = false;

    var argArray = Array.from(args);

    if (namespace) {
        tNamespace = self.namespaces[namespace];
    }

    if (tNamespace) {
        outputThis = tNamespace.active;

        if (self.showOnly && self.showOnly.length > 0) {
            if(!self.filterMessageShown) {
                console.log('%c Showing logs for ' + JSON.stringify(self.showOnly) + ' only.',
                    'color: #00A499;font-size:10pt');
                self.filterMessageShown = true;
            }
            outputThis = (self.showOnly.indexOf(namespace) !== -1);
        }

        if (!outputThis) return;

        if (tNamespace.style) {
            if(!self.filterMessageShown) {
                console.log('%c' + namespace + ':',
                    'color: ' + tNamespace.style.color + ';font-size: ' + tNamespace.style.fontSize);
            }

            argArray.forEach(function (tArg) {
                console.log(tArg);
                /*console.log.call(console, '%c' + JSON.stringify(tArg),
                 'color: ' + tNamespace.style.color + ';font-size: ' + tNamespace.style.fontSize);*/
            });

            /*console.log('%c----------------------------------',
             'color: ' + tNamespace.style.color + ';font-size: ' + tNamespace.style.fontSize);*/
        } else {
            console.log(namespace + ':');

            argArray.forEach(function (tArg) {
                console.log(tArg);
            });
            /*console.log('----------------------------------');*/
        }
    }
};
