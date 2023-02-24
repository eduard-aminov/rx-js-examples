import { TestScheduler } from 'rxjs/testing';
import { delay, expand, map, of, take } from 'rxjs';

let testScheduler: TestScheduler;

beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
    });
});

describe('expand', () => {
    test('Start emitting the powers of two on every emit, at most 6 of them', () => {
        const emits$ = of('emit', 'emit');
        const obs$ = emits$.pipe(
            map(() => 1),
            expand(x => of(2 * x).pipe(delay(1000))),
            take(6),
        );

        testScheduler.run(helpers => {
            const { expectObservable } = helpers;

            const expectedMarble = '(ab) 996ms (cd) 996ms (ef|)';
            const expectedValues = {
                a: 1,
                b: 1,
                c: 2,
                d: 2,
                e: 4,
                f: 4,
            };

            expectObservable(obs$).toBe(expectedMarble, expectedValues);
        });
    });
});
