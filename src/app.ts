/* TODO
 **  [X] Invoke test method
 **  [X] Invoke setUp first
 **  Invoke tearDown afterward
 **  Invoke tearDown even if the test method fails
 **  Run multiple tests
 **  Report collected results
 **  [X] Log string in WasRun
 */
class TestCase {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }

  public run(): void {
    this.setUp();
    this[this.name]();
    this.tearDown();
  }

  // tslint:disable-next-line: no-empty
  public setUp(): void {}

  // tslint:disable-next-line: no-empty
  public tearDown(): void {}
}

// tslint:disable-next-line: max-classes-per-file
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

  public tearDown(): void {
    this.log = this.log + ' tearDown';
  }
}

// tslint:disable-next-line: max-classes-per-file
class TestCaseTest extends TestCase {
  private test: WasRun;

  public testTemplateMethod(): void {
    this.test = new WasRun('testMethod');
    this.test.run();
    this.assert('setUp testMethod tearDown' === this.test.log);
  }

  private assert(value: boolean): void {
    if (value) {
      // tslint:disable-next-line: no-console
      return console.log('OK');
    }
    throw new Error('Expected true, got false');
  }
}

new TestCaseTest('testTemplateMethod').run();
