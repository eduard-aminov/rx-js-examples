import {TestScheduler} from 'rxjs/testing';
import {concatMap, interval, of, take} from 'rxjs';

let testScheduler: TestScheduler;

beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
    });
});

describe('concatMap', () => {
    test('Spawn a new interval Observable for each emit with no concurrency', () => {
        const values$ = of(1, 2, 3);
        const obs$ = values$.pipe(concatMap(() => interval(1000).pipe(take(3))))

        testScheduler.run(helpers => {
            const {expectObservable} = helpers;

            const expectedMarble = '1s a 999ms b 999ms c 999ms a 999ms b 999ms c 999ms a 999ms b 999ms (c|)';
            const expectedValues = {
                a: 0,
                b: 1,
                c: 2,
            };

            expectObservable(obs$).toBe(expectedMarble, expectedValues);
        });
    });
});
