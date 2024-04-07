// Tests will run twice, to ensure the ESM and CommonJS versions both work as expected
import Dlog from "../dist/dlog.esm";

function testLogging(Dlog) {
  let logger;

  beforeEach(() => {
    logger = new Dlog();
    jest.clearAllMocks(); // Clears the mock call history before each test
  });

  describe('namespace creation and styling', () => {
    it('creates a namespace with default style', () => {
      const namespace = logger.namespace('default');
      expect(logger.namespaces['default'].style).toEqual({
        fontSize: '10pt',
        color: '#63666A',
      });
    });

    it('creates a namespace with custom style', () => {
      const customStyle = { color: '#FF4858', fontSize: '12pt' };
      const namespace = logger.namespace('custom', customStyle);
      expect(logger.namespaces['custom'].style).toEqual(customStyle);
    });
  });

  describe('logging functionality', () => {
    beforeEach(() => {
      jest.spyOn(console, 'log').mockImplementation(() => {});
      jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      console.log.mockRestore();
      console.error.mockRestore();
    });

    it('logs a message to console.log', () => {
      const testNamespace = logger.namespace('test');
      testNamespace.log('Test message');
      expect(console.log).toHaveBeenCalled();
    });

    it('logs an error to console.error', () => {
      const errorNamespace = logger.namespace('error');
      errorNamespace.error('Error message');
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('global toggle functionality', () => {
    it('toggles global silence', () => {
      logger.toggleGlobalSilence(true);
      expect(logger.isSilenced).toBe(true);
      logger.toggleGlobalSilence(false);
      expect(logger.isSilenced).toBe(false);
    });

    it('deactivates all namespaces', () => {
      logger.namespace('test1');
      logger.namespace('test2');
      logger.deactivateAllNamespaces();
      expect(logger.namespaces['test1'].active).toBe(false);
      expect(logger.namespaces['test2'].active).toBe(false);
    });
  });

  describe('color management', () => {
    it('disables and enables color usage', () => {
      logger.disableColorUsage(true);
      expect(logger.useColor).toBe(false);
      logger.disableColorUsage(false);
      expect(logger.useColor).toBe(true);
    });

    it('sets a default color', () => {
      const newColor = '#FFFFFF';
      logger.setDefaultColor(newColor);
      expect(logger.defaultColor).toBe(newColor);
    });
  });
}

describe('Dlog CommonJS Version', () => {
  const DlogCJS = require('../dist/dlog.cjs');
  testLogging(DlogCJS);
});

describe('Dlog ES Module Version', () => {  
  testLogging(Dlog);
});  
