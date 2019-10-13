import TestCaseTest from './test-case-test';

Reflect.ownKeys(TestCaseTest.prototype)
  .filter((key: string) => /^test/.test(key as string))
  .forEach((method: string) => {
    new TestCaseTest(method).run();
  });
