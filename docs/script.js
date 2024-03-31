// Initialize the Dlog class instance
const logger = new Dlog();

// Create namespaces for logging
const debugLogger = logger.namespace('debug');
const errorLogger = logger.namespace('error');
const infoLogger = logger.namespace('info');

// Set initial configuration for namespaces
logger.namespaces['debug'] = { active: true, style: { fontSize: '8pt', color: '#007ACC' }};
logger.namespaces['error'] = { active: true, style: { fontSize: '8pt', color: '#CC3300' }};
logger.namespaces['info'] = { active: true, style: { fontSize: '8pt', color: '#33CC33' }};

// Output sample log and error messages from different namespaces
debugLogger.log('Debugging the new feature.');
errorLogger.error('Error encountered while processing.');
infoLogger.log('Information: Process started.');

// Demonstrate global silence
logger.toggleGlobalSilence(true);
debugLogger.log('This debug message should not appear due to global silence.');
errorLogger.error('This error message should also not appear due to global silence.');
logger.toggleGlobalSilence(false); // Re-enable logging globally

// Reactivating a specific namespace and demonstrating again
logger.namespaces['debug'].active = false; // Deactivate the debug namespace
debugLogger.log('This debug message should not appear as the debug namespace is deactivated.');

logger.deactivateAllNamespaces(); // Deactivate all namespaces
infoLogger.log('This info message should not appear as all namespaces are deactivated.');

// Re-activate error namespace to demonstrate error logging
logger.namespaces['error'].active = true;
errorLogger.error('This error message should appear even after deactivating all namespaces, as the error namespace was reactivated.');

// Output:
// "Debugging the new feature." (styled in blue)
// Error: "Error encountered while processing." (styled in red, shown as error in console)
// "Information: Process started." (styled in green)
// -- Global silence is then enabled, so no messages will appear --
// -- Global silence is disabled, but the debug namespace remains deactivated --
// -- All namespaces are deactivated, so no messages will appear --
// Error: "This error message should appear even after deactivating all namespaces, as the error namespace was reactivated." (styled in red, shown as error in console)
