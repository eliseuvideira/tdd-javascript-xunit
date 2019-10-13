/* TODO
 **  [X] Invoke test method
 **  [X] Invoke setUp first
 **  Invoke tearDown afterward
 **  Invoke tearDown even if the test method fails
 **  Run multiple tests
 **  Report collected results
 */
class TestCase {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }

  public run(): void {
    this.setUp();
    this[this.name]();
  }

  public setUp(): void {}
}

// tslint:disable-next-line: max-classes-per-file
class WasRun extends TestCase {
  public wasRun: boolean;
  public wasSetUp: boolean;

  constructor(name: string) {
    super(name);
  }

  public testMethod(): void {
    this.wasRun = true;
  }

  public setUp(): void {
    this.wasRun = false;
    this.wasSetUp = true;
  }
}

// tslint:disable-next-line: max-classes-per-file
class TestCaseTest extends TestCase {
  private test: WasRun;

  public setUp(): void {
    this.test = new WasRun('testMethod');
  }

  public testRunning(): void {
    this.test.run();
    this.assert(this.test.wasRun);
  }

  public testSetUp(): void {
    this.test.run();
    this.assert(this.test.wasSetUp);
  }

  private assert(value: boolean): void {
    if (value) {
      // tslint:disable-next-line: no-console
      return console.log('OK');
    }
    throw new Error('Expected true, got false');
  }
}

new TestCaseTest('testRunning').run();
new TestCaseTest('testSetUp').run();
