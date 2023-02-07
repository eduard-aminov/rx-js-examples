import { TestScheduler } from 'rxjs/testing';
import { buffer, interval, take, timer } from 'rxjs';

let testScheduler: TestScheduler;

beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
    });
});

describe('buffer', () => {
    test('buffer', () => {
        const intervals$ = interval(4).pipe(
            take(3)
        );

        const obs$ = timer(0, 1).pipe(
            take(12),
            buffer(intervals$)
        );

        testScheduler.run(helpers => {
            const { expectObservable } = helpers;

            const expectedMarble = '4ms a 3ms b 2ms (c|)'; // 2ms ???
            const expectedValues = {
                a: [0, 1, 2, 3],
                b: [4, 5, 6, 7],
                c: [8, 9, 10, 11],
            };

            expectObservable(obs$).toBe(expectedMarble, expectedValues);
        });
    });
});
