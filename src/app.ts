/* TODO
 **  [X] Invoke test method
 **  [X] Invoke setUp first
 **  Invoke tearDown afterward
 **  Invoke tearDown even if the test method fails
 **  Run multiple tests
 **  Report collected results
 **  [X] Log string in WasRun
 **  [X] Report failed tests
 **  Catch and report setUp errors
 */
// tslint:disable: max-classes-per-file

class TestResult {
  private runCount: number;
  private errorCount: number;

  constructor() {
    this.runCount = 0;
    this.errorCount = 0;
  }

  public testStarted(): void {
    this.runCount += 1;
  }

  public testFailed(): void {
    this.errorCount += 1;
  }

  public summary(): string {
    return `${this.runCount} run, ${this.errorCount} failed`;
  }
}

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

class WasRun extends TestCase {
  public wasRun: boolean;
  public log: string;

  constructor(name: string) {
    super(name);
  }

  public setUp(): void {
    this.wasRun = false;
    this.log = 'setUp';
  }

  public testMethod(): void {
    this.wasRun = true;
    this.log = this.log + ' testMethod';
  }

  public testBrokenMethod(): void {
    throw new Error();
  }

  public tearDown(): void {
    this.log = this.log + ' tearDown';
  }
}

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

Reflect.ownKeys(TestCaseTest.prototype)
  .filter((key: string) => /^test/.test(key as string))
  .forEach((method: string) => {
    new TestCaseTest(method).run();
  });
