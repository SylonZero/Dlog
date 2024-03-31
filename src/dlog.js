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
 * Version: 1.0
 * Last Modified: Mar 31, 2024
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
    } else {
      const style = `color: ${tNamespace.style.color}; font-size: ${tNamespace.style.fontSize}`;
      console.log(`%c${namespace}:`, style, ...args);
    }
  }

  /**
   * Creates a logging interface for a specific namespace, enabling both standard and error logs.
   * @param {string} namespace - The namespace to log messages under.
   * @returns {Object} An object containing 'log' and 'error' methods for logging.
   */
  namespace(namespace) {
    if (namespace && namespace.trim() !== '' && !this.namespaces.hasOwnProperty(namespace)) {
      this.namespaces[namespace] = {
        active: true,
        style: {
          fontSize: '8pt',
          color: '#63666A',
        },
      };
    }

    return {
      log: (...args) => Dlog.logMessage.call(this, namespace, args, 'log'),
      error: (...args) => Dlog.logMessage.call(this, namespace, args, 'error'),
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
}
