import { TestScheduler } from 'rxjs/testing';
import { concat, interval, range, take } from 'rxjs';

let testScheduler: TestScheduler;

beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
    });
});

describe('concat', () => {
    test('concatenate a timer counting from 0 to 2 with a synchronous sequence from 1 to 3', () => {
        const timer = interval(1000).pipe(take(3));
        const sequence = range(1, 3);
        const obs$ = concat(timer, sequence);

        testScheduler.run(helpers => {
            const { expectObservable } = helpers;

            const expectedMarble = '1s a 999ms b 999ms (cdef|)';
            const expectedValues = {
                a: 0,
                b: 1,
                c: 2,
                d: 1,
                e: 2,
                f: 3,
            };

            expectObservable(obs$).toBe(expectedMarble, expectedValues);
        });
    });
});
