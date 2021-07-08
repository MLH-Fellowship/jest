import tsd from 'tsd';
import * as fs from 'fs';
import {highlight} from 'cli-highlight';
import {pass, fail} from 'create-jest-runner';

export default ({testPath, config}) => {
    const start = new Date();
    const contents = fs.readFileSync(testPath, 'utf-8');

    // Temporary - To check the runner
    return pass({
        start,
        end: +new Date(),
        test: { path: testPath }
    });
};
