# Dlog - Debug Logging Utility

Dlog is a flexible and customizable utility designed to enhance JavaScript logging capabilities while debugging code in the browser. It provides namespace-based log management, global silence control, and distinguishes between standard logs and error reports. Dlog is ideal for developers looking for more control over their application's logging output.

Dlog is inspired by the useful `node-debug` utility for Node.js logging from TJ.

## Features

- **Namespace-based Logging**: Organize logs into namespaces with customizable styles.
- **Customizable Styling**: Define custom styles for log messages to distinguish between namespaces.
- **Automatic Color Rotation**: Namespaces added within each app get assigned a different color as part of a built-in palette.
- **Source File Display**: Ensure that the source file of the log message displays in the Dev console for easy access.
- **Global Silence Control**: Easily toggle logging on and off globally—useful for production.
- **Error Logging**: Separate methods for logging errors, utilizing `console.error` for error reporting.
- **Log Filtering**: Focus on logs from specific namespaces by filtering the output.
- **Color Toggle**: Turn off color usage globally if that feature is not desired.

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

const appMainLog = logger.namespace('app-master');
const taskManagerLog = logger.namespace('task-manager');

// Standard logging
appMainLog.log('This is a debug message.');

// Error logging
taskManagerLog.error('This is an error message.');
```

### Screenshot of sample logs with source file identified
![Sample Dlog output](/dlog-sample-output-1.png "Sample output with source file identified")

### Creating and Styling Namespaces

You can create namespaces with specific style attributes to organize and differentiate log messages visually. 
By default, new namespaces get a color from a built-in set of 5 colors that rotate.

#### Creating a Namespace with Style specified

```javascript
// Create a namespace with custom style
const logger = new Dlog();
logger.namespace('task-manager', { color: '#FF4858', fontSize: '12pt' });
```

#### Setting attributes on an existing namespace

```javascript
logger.namespaces['task-manager'] = {
    active: true,
    style: {
        color: '#FF4858', // Coral Red
        fontSize: '12pt'
    }
};
```

### Disabling color

You can disable all color usage - color for all namespaces will use the defaultColor attribute, which can be customized depending on whether you have a dark/light scheme enabled in your browser window:

```javascript
logger.disableColorUsage(); // turns off all color and uses the defaultColor
logger.disableColorUsage(false); // turns color back on

logger.setDefaultColor('#ffffff'); // sets the default color to white
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
logger.namespaces['task-manager'].active = false;

// Deactivate all namespaces
logger.deactivateAllNamespaces();
```

## API Documentation

- `constructor`: Initializes the Dlog instance.
- `logMessage(namespace, args, logType)`: Internal method for logging messages.
- `namespace(namespace, style)`: Creates a logging interface for a specific namespace with optional style attributes.
- `deactivateAllNamespaces()`: Deactivates all namespaces, preventing their logs from being output.
- `toggleGlobalSilence(silence = true)`: Toggles the global silence flag.
- `disableColorUsage(disable = true)`: Turns off the use of custom colors in the log output.
- `setDefaultColor(color = '#000000')`: Sets the default color to use when custom colors have been disabled.

## Contributing

Contributions to Dlog are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Implement your changes.
4. Submit a pull request.

Please ensure your code adheres to the existing style and includes appropriate documentation and tests.

## License

Dlog is released under the MIT License. See the LICENSE file for more details.
