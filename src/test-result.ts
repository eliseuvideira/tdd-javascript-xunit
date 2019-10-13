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

export default TestResult;
