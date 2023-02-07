import {TestScheduler} from 'rxjs/testing';
import {concatAll, interval, map, of, take} from 'rxjs';

let testScheduler: TestScheduler;

beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
    });
});

describe('concatAll', () => {
    test('Spawn a new interval Observable for each emit with no concurrency', () => {
        const values$ = of(1, 2, 3);
        const highOrder$ = values$.pipe(map(() => interval(1000).pipe(take(3))))
        const firstOrder$ = highOrder$.pipe(concatAll());

        testScheduler.run(helpers => {
            const {expectObservable} = helpers;

            const expectedMarble = '1s a 999ms b 999ms c 999ms a 999ms b 999ms c 999ms a 999ms b 999ms (c|)';
            const expectedValues = {
                a: 0,
                b: 1,
                c: 2,
            };

            expectObservable(firstOrder$).toBe(expectedMarble, expectedValues);
        });
    });
});
