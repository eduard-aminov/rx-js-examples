import { TestScheduler } from 'rxjs/testing';
import { of, partition } from 'rxjs';

let testScheduler: TestScheduler;

beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
    });
});

describe('partition', () => {
    test('partition a set of numbers into odds and evens observables', () => {
        const observableValues$ = of(1, 2, 3, 4, 5, 6);
        const [evens$, odds$] = partition(observableValues$, value => value % 2 === 0);

        testScheduler.run(helpers => {
            const { expectObservable } = helpers;

            const expectedMarble = '(abc|) ';
            const expectedValues = { a: 1, b: 3, c: 5 };

            expectObservable(odds$).toBe(expectedMarble, expectedValues);
        });

        testScheduler.run(helpers => {
            const { expectObservable } = helpers;

            const expectedMarble = '(abc|) ';
            const expectedValues = { a: 2, b: 4, c: 6 };

            expectObservable(evens$).toBe(expectedMarble, expectedValues);
        });
    });
});
