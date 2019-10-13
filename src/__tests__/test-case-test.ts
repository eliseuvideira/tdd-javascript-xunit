import TestCase from '../test-case';
import TestResult from '../test-result';
import WasRun from './was-run';

class TestCaseTest extends TestCase {
  public testTemplateMethod(): void {
    const test = new WasRun('testMethod');
    test.run();
    this.assert('setUp testMethod tearDown' === test.log);
  }

  public testFailedResults(): void {
    const test = new WasRun('testBrokenMethod');
    const result = test.run();
    this.assert('1 run, 1 failed' === result.summary());
  }

  public testFailedResultsFormatting() {
    const result = new TestResult();
    result.testStarted();
    result.testFailed();
    this.assert('1 run, 1 failed' === result.summary());
  }

  public testResult(): void {
    const test = new WasRun('testMethod');
    const result = test.run();
    this.assert('1 run, 0 failed' === result.summary());
  }

  private assert(value: boolean): void {
    if (value) {
      // tslint:disable-next-line: no-console
      return console.log('OK');
    }
    throw new Error('Expected true, got false');
  }
}

export default TestCaseTest;
