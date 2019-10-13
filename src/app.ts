/* TODO
 **  [X] Invoke test method
 **  Invoke setUp first
 **  Invoke tearDown afterward
 **  Invoke tearDown even if the test method fails
 **  Run multiple tests
 **  Report collected results
 */
class TestCase {
  public name: string;
  constructor(name) {
    this.name = name;
  }

  run(): void {
    this[this.name]();
  }
}

class WasRun extends TestCase {
  public wasRun: boolean;

  constructor(name) {
    super(name);
    this.wasRun = false;
  }

  testMethod(): void {
    this.wasRun = true;
  }
}

class TestCaseTest extends TestCase {
  assert(value: boolean): void {
    if (value) {
      return console.log('OK');
    }
    throw new Error('Expected true, got false');
  }

  testRunning(): void {
    const test = new WasRun('testMethod');
    this.assert(!test.wasRun);
    test.run();
    this.assert(test.wasRun);
  }
}

new TestCaseTest('testRunning').run();
