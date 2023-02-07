import {TestScheduler} from 'rxjs/testing';
import {interval, map, mergeMap, of, take} from 'rxjs';

let testScheduler: TestScheduler;

beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
    });
});

describe('mergeMap', () => {
    test('Map and flatten each letter to an Observable ticking every 1 second', () => {
        const letters$ = of('a', 'b', 'c');
        const obs$ = letters$.pipe(
            mergeMap(letter => interval(1000).pipe(
                map(i => letter + i),
                take(2)
            ))
        );

        testScheduler.run(helpers => {
            const {expectObservable} = helpers;

            const expectedMarble = '1s (abc) 995ms (def|)';
            const expectedValues = {
                a: 'a0',
                b: 'b0',
                c: 'c0',
                d: 'a1',
                e: 'b1',
                f: 'c1',
            };

            expectObservable(obs$).toBe(expectedMarble, expectedValues);
        });
    });
});
