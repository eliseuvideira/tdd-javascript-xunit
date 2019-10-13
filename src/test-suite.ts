import TestCase from './test-case';
import TestResult from './test-result';

class TestSuite {
  private tests: TestCase[];

  constructor() {
    this.tests = [];
  }

  public add(test: TestCase): void {
    this.tests.push(test);
  }

  public run(result: TestResult): void {
    this.tests.forEach((test) => {
      test.run(result);
    });
  }
}

export default TestSuite;
