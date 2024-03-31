# Dlog - Custom Logging Utility

Dlog is a flexible and customizable logging utility designed to enhance JavaScript logging capabilities. It provides namespace-based log management, global silence control, and distinguishes between standard logs and error reports. Dlog is ideal for developers looking for more control over their application's logging output.

## Features

- **Namespace-based Logging**: Organize logs into namespaces with customizable styles.
- **Global Silence Control**: Easily toggle logging on and off globally—useful for production.
- **Error Logging**: Separate methods for logging errors, utilizing `console.error` for error reporting.
- **Customizable Styling**: Define custom styles for log messages to distinguish between namespaces.
- **Log Filtering**: Focus on logs from specific namespaces by filtering the output.

## Installation

To include Dlog in your project, simply copy the `Dlog.js` file into your project directory. You can then import or require `Dlog` in your JavaScript files.

```javascript
import Dlog from './path/to/Dlog.js';
```

Or, if you're using CommonJS modules:

```javascript
const Dlog = require('./path/to/Dlog.js');
```

## Usage

### Basic Usage

Initialize a `Dlog` instance and create loggers for different namespaces:

```javascript
const logger = new Dlog();

const debugLog = logger.namespace('debug');
const errorLog = logger.namespace('error');

// Standard logging
debugLog.log('This is a debug message.');

// Error logging
errorLog.error('This is an error message.');
```

### Global Silence

Toggle global silence to turn off all logging, useful for production environments:

```javascript
logger.toggleGlobalSilence(true); // Silence all logs
logger.toggleGlobalSilence(false); // Reactivate logging
```

### Deactivating Namespaces

Deactivate all namespaces or specific ones:

```javascript
// Deactivate a specific namespace
logger.namespaces['debug'].active = false;

// Deactivate all namespaces
logger.deactivateAllNamespaces();
```

## API Documentation

- `constructor`: Initializes the Dlog instance.
- `logMessage(namespace, args, logType)`: Internal method for logging messages.
- `namespace(namespace)`: Creates a logging interface for a specific namespace.
- `deactivateAllNamespaces()`: Deactivates all namespaces, preventing their logs from being output.
- `toggleGlobalSilence(silence = true)`: Toggles the global silence flag.

## Contributing

Contributions to Dlog are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Implement your changes.
4. Submit a pull request.

Please ensure your code adheres to the existing style and includes appropriate documentation and tests.

## License

Dlog is released under the MIT License. See the LICENSE file for more details.
