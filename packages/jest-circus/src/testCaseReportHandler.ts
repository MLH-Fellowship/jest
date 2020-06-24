/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {Circus} from '@jest/types';
import type {TestCase} from '@jest/test-result';
import {makeSingleTestResult, parseSingleTestResult} from './utils';

const testCaseReportHandler = (
  testPath: string,
  sendMessageToJest: Function,
) => (event: Circus.Event) => {
  switch (event.name) {
    case 'test_done': {
      const testResult = makeSingleTestResult(event.test);
      const testCaseResult = parseSingleTestResult(testResult);
      const testCase: TestCase = {
        ancestorTitles: testCaseResult.ancestorTitles,
        fullName: testCaseResult.fullName,
        location: testCaseResult.location,
        title: testCaseResult.title,
      };
      sendMessageToJest('test-case-result', [
        testPath,
        testCase,
        testCaseResult,
      ]);
      break;
    }
  }
};

export default testCaseReportHandler;
