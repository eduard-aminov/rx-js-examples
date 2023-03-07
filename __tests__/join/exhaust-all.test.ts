import { TestScheduler } from 'rxjs/testing';
import { exhaustAll, interval, map, of, take } from 'rxjs';

let testScheduler: TestScheduler;

beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
    });
});

describe('exhaustAll', () => {
    test('Spawn a new interval Observable for each emit, however ' +
        'ignores every new inner Observable if the previous Observable has not yet completed', () => {
        const values$ = of(1, 2, 3);
        const highOrder$ = values$.pipe(map(() => interval(1000).pipe(take(3))));
        const firstOrder$ = highOrder$.pipe(exhaustAll());

        testScheduler.run(helpers => {
            const { expectObservable } = helpers;

            const expectedMarble = '1s a 999ms b 999ms (c|)';
            const expectedValues = {
                a: 0,
                b: 1,
                c: 2,
            };

            expectObservable(firstOrder$).toBe(expectedMarble, expectedValues);
        });
    });
});
