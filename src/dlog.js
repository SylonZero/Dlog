/**
 * Dlog - A Custom Logging Utility
 *
 * The Dlog class provides a flexible logging system that allows for namespace-based log management,
 * global silence control, and differentiation between standard and error logs. It's designed to
 * enhance the built-in console logging capabilities with additional features such as log filtering
 * by namespace, toggling log output globally, and custom styling for log messages.
 *
 * Features:
 * - Namespace-based logging with customizable styles.
 * - Global toggle to silence all logs, useful for production environments.
 * - Separate methods for standard logging and error reporting.
 * - Ability to activate/deactivate logging on a per-namespace basis.
 * - Option to filter logs to show only specific namespaces.
 *
 * Author: Sai Prakash
 * Version: 1.1
 * Last Modified: Apr 6, 2024
 * https://github.com/SylonZero/Dlog
 *
 */
class Dlog {
  /**
   * Initializes a new instance of the Dlog class.
   */
  constructor() {
    this.namespaces = {
      default: {
        active: false,
        style: {
          fontSize: '10pt',
          color: '#63666A',
        },
      },
    };

    this.showOnly = [];
    this.filterMessageShown = false;
    this.isSilenced = false;

    this.colorIndex = 0; // Keep track of the current color index
    this.useColor = true; // Global flag to toggle color usage
    this.defaultColor = '#000000'; // black
  }

  // Add a static property for our built-in color themes
  static colorTheme = ['#FF4858', '#1B7F79', '#00CCC0', '#72F2EB', '#747F7F'];

  /**
   * Logs a portion of the stack trace to identify the source of the log call. This method allows for
   * specifying the depth of the stack trace to be logged, helping to pinpoint the origin of the log
   * message in the code. It safely handles cases where the stack trace might not be available or
   * sufficiently deep.
   *
   * @param {number} depth The desired depth of the stack trace to log. Defaults to 3, indicating that
   *                       up to three lines of the stack trace will be logged, starting from the call
   *                       to this log method.
   */
  static logLimitedTrace(depth = 3) {
    try {
      // Create an Error instance to capture the stack trace
      const err = new Error();

      // Check if the stack trace is available
      if (err.stack) {
        // Split the stack trace into individual lines
        const stackLines = err.stack.split('\n');
        // Check if there are enough lines in the stack trace
        if (stackLines.length > 3) {
          // Extract the desired part of the stack trace
          const relevantStackPart = stackLines.slice(4, depth + 2).join('\n');
          // Log the extracted part of the stack trace
          console.log(relevantStackPart);
        }
      }
    } catch (exception) {}
  }

  /**
   * Logs a message or error to the console, applying the appropriate styling and filtering based on the namespace and log type.
   * @param {string} namespace - The namespace of the log message.
   * @param {Array} args - The arguments to log.
   * @param {string} [logType='log'] - The type of log ('log' or 'error').
   */
  static logMessage(namespace, args, logType = 'log') {
    if (this.isSilenced) return;

    const tNamespace = this.namespaces[namespace] || this.namespaces['default'];
    let outputThis = tNamespace.active;

    if (this.showOnly.length > 0) {
      if (!this.filterMessageShown) {
        console.log(`%c Showing logs for ${JSON.stringify(this.showOnly)} only.`, 'color: #00A499; font-size:10pt');
        this.filterMessageShown = true;
      }
      outputThis = this.showOnly.includes(namespace);
    }

    if (!outputThis) return;

    if (logType === 'error') {
      console.error(`${namespace}:`, ...args);
      Dlog.logLimitedTrace(3);
    } else {
      const style = `color: ${tNamespace.style.color}; font-size: ${tNamespace.style.fontSize}`;

      console.log(`%c${namespace}:`, style, ...args);
      Dlog.logLimitedTrace(3);
    }
  }

  /**
   * Creates a logging interface for a specific namespace, enabling both standard and error logs.
   * @param {string} namespaceName - The namespace to log messages under.
   * @param {object} styleOpts - Optional font color and font size settings for this namespace.
   * @returns {Object} An object containing 'log' and 'error' methods for logging.
   */
  namespace(namespaceName, styleOpts = {}) {
    if (namespaceName && namespaceName.trim() !== '' && !this.namespaces.hasOwnProperty(namespaceName)) {
      // Use provided style options or assign color using the current index, rotate if at the end of the colorTheme array
      const color = this.useColor ? (styleOpts.color || Dlog.colorTheme[this.colorIndex]) : this.defaultColor; // Default to black if color usage is disabled
      const fontSize = styleOpts.fontSize || '8pt'; // Use provided fontSize or default

      this.namespaces[namespaceName] = {
        active: true,
        style: {
          fontSize: fontSize,
          color: color,
        },
      };

      // Move to the next color in the theme, wrapping around if necessary
      this.colorIndex = (this.colorIndex + 1) % Dlog.colorTheme.length;
    }

    return {
      log: (...args) => Dlog.logMessage.call(this, namespaceName, args, 'log'),
      error: (...args) => Dlog.logMessage.call(this, namespaceName, args, 'error'),
    };
  }

  /**
   * Deactivates all namespaces, preventing any logs from those namespaces from being output.
   */
  deactivateAllNamespaces() {
    Object.keys(this.namespaces).forEach(namespace => {
      this.namespaces[namespace].active = false;
    });
  }

  /**
   * Toggles the global silence flag, which determines whether any logs are output.
   * @param {boolean} [silence=true] - Whether to silence all log output.
   */
  toggleGlobalSilence(silence = true) {
    this.isSilenced = silence;
  }

  /**
   * Toggles the global color usage flag
   * @param {boolean} [disable=true] - Whether to disable the use of color in the output logs
   */
  disableColorUsage(disable = true) {
    this.useColor = !disable;
  }

  /**
   * Sets the default color to use when custom colors are disabled
   * @param {string} [color='#000000'] - Hex value as a string for the color to use
   */
  setDefaultColor(color = '#000000') {
    this.defaultColor = color;
  }
}

module.exports = Dlog;