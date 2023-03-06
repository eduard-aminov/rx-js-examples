import { TestScheduler } from 'rxjs/testing';
import { of, partition } from 'rxjs';

let testScheduler: TestScheduler;

beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
    });
});

test('Partition a set of numbers into odds and evens observables', () => {
    const obs$ = of(1, 2, 3, 4, 5, 6);
    const [evens$, odds$] = partition(obs$, value => value % 2 === 0);


    testScheduler.run(helpers => {
        const { expectObservable } = helpers;

        const expectedMarble = '(abc|)';
        const expectedValuesEvens = {
            a: 2,
            b: 4,
            c: 6,
        };

        const expectedValuesOdds = {
            a: 1,
            b: 3,
            c: 5,
        };

        expectObservable(evens$).toBe(expectedMarble, expectedValuesEvens);
        expectObservable(odds$).toBe(expectedMarble, expectedValuesOdds);
    });
});
