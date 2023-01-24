import { TestScheduler } from 'rxjs/testing';
import { range } from 'rxjs';

let testScheduler: TestScheduler;

beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
    });
});

test('range', () => {
    testScheduler.run(helpers => {
        const obs$ = range(1, 3);
        const { expectObservable } = helpers;

        const expectedMarble = '(abc|)';
        const expectedValues = {
            a: 1,
            b: 2,
            c: 3,
        };

        expectObservable(obs$).toBe(expectedMarble, expectedValues);
    });
});
