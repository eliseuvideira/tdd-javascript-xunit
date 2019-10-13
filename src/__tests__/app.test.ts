import TestResult from '../test-result';
import TestSuite from '../test-suite';
import TestCaseTest from './test-case-test';

const suite = new TestSuite();

Reflect.ownKeys(TestCaseTest.prototype)
  .filter((key: string) => /^test/.test(key as string))
  .forEach((method: string) => {
    suite.add(new TestCaseTest(method));
  });

const result = new TestResult();

suite.run(result);

// tslint:disable-next-line: no-console
console.log(result.summary());
