import { TestScheduler } from 'rxjs/testing';
import { of } from 'rxjs';

let testScheduler: TestScheduler;

beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
    });
});

test('of input as arguments', () => {
    const obs$ = of(1, 2, 3);

    testScheduler.run(helpers => {
        const { expectObservable } = helpers;

        const expectedMarble = '(abc|)';
        const expectedValues = {
            a: 1,
            b: 2,
            c: 3,
        };

        expectObservable(obs$).toBe(expectedMarble, expectedValues);
    });
});

test('of input as array', () => {
    const obs$ = of([1, 2, 3]);

    testScheduler.run(helpers => {
        const { expectObservable } = helpers;

        const expectedMarble = '(a|)';
        const expectedValues = {
            a: [1, 2, 3],
        };

        expectObservable(obs$).toBe(expectedMarble, expectedValues);
    });
});

