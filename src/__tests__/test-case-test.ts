import TestCase from '../test-case';
import TestResult from '../test-result';
import TestSuite from '../test-suite';
import WasRun from './was-run';

class TestCaseTest extends TestCase {
  private result: TestResult;

  public setUp(): void {
    this.result = new TestResult();
  }

  public testTemplateMethod(): void {
    const test = new WasRun('testMethod');
    test.run(this.result);
    this.assert('setUp testMethod tearDown' === test.log);
  }

  public testFailedResults(): void {
    const test = new WasRun('testBrokenMethod');
    test.run(this.result);
    this.assert('1 run, 1 failed' === this.result.summary());
  }

  public testFailedResultsFormatting() {
    this.result.testStarted();
    this.result.testFailed();
    this.assert('1 run, 1 failed' === this.result.summary());
  }

  public testResult(): void {
    const test = new WasRun('testMethod');
    test.run(this.result);
    this.assert('1 run, 0 failed' === this.result.summary());
  }

  public testSuite(): void {
    const suite = new TestSuite();
    suite.add(new WasRun('testMethod'));
    suite.add(new WasRun('testBrokenMethod'));
    suite.run(this.result);
    this.assert('2 run, 1 failed' === this.result.summary());
  }

  private assert(value: boolean): void {
    if (!value) {
      throw new Error('Expected true, got false');
    }
  }
}

export default TestCaseTest;
