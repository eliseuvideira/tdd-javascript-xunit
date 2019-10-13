import TestResult from './test-result';

class TestCase {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }

  public run(): TestResult {
    const result = new TestResult();
    result.testStarted();
    this.setUp();
    try {
      this[this.name]();
    } catch (err) {
      result.testFailed();
    }
    this.tearDown();

    return result;
  }

  // tslint:disable-next-line: no-empty
  public setUp(): void {}

  // tslint:disable-next-line: no-empty
  public tearDown(): void {}
}

export default TestCase;
