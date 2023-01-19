import { TestScheduler } from 'rxjs/testing';
import { EMPTY } from 'rxjs';

let testScheduler: TestScheduler;

beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
    });
});

test('EMPTY', () => {
    testScheduler.run(helpers => {
        const { expectObservable } = helpers;

        const expectedMarble = '|';

        expectObservable(EMPTY).toBe(expectedMarble);
    });
});
