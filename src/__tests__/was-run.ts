import TestCase from '../test-case';

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

export default WasRun;
