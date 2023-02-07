import {TestScheduler} from 'rxjs/testing';
import {interval, map, mergeAll, of, take} from 'rxjs';

let testScheduler: TestScheduler;

beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
    });
});

describe('mergeAll', () => {
    test('Spawn a new interval Observable for each emit', () => {
        const values$ = of(1, 2, 3);
        const highOrder$ = values$.pipe(map(() => interval(1000).pipe(take(3))))
        const firstOrder$ = highOrder$.pipe(mergeAll());

        testScheduler.run(helpers => {
            const {expectObservable} = helpers;

            const expectedMarble = '1s (aaa) 995ms (bbb) 995ms (ccc|)';
            const expectedValues = {
                a: 0,
                b: 1,
                c: 2,
            };

            expectObservable(firstOrder$).toBe(expectedMarble, expectedValues);
        });
    });
});
