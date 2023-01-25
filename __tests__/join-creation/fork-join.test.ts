import { TestScheduler } from 'rxjs/testing';
import { forkJoin, of, timer } from 'rxjs';

let testScheduler: TestScheduler;

beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
    });
});

describe('forkJoin', () => {
    test('forkJoin with an array of observable inputs', () => {
        const obs$ = forkJoin([
            of(1, 2, 3, 4),
            of(8),
            timer(4000)
        ]);

        testScheduler.run(helpers => {
            const { expectObservable } = helpers;

            const expectedMarble = '4s (a|)';
            const expectedValues = {
                a: [ 4, 8, 0 ],
            };

            expectObservable(obs$).toBe(expectedMarble, expectedValues);
        });
    });
});
