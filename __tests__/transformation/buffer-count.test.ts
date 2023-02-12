import { TestScheduler } from 'rxjs/testing';
import { bufferCount, of } from 'rxjs';

let testScheduler: TestScheduler;

beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
    });
});

describe('bufferCount', () => {
    test('Emits the last two emits as an array', () => {
        const obs$ = of(1, 2, 3, 4, 5, 6).pipe(
            bufferCount(2),
        );

        testScheduler.run(helpers => {
            const { expectObservable } = helpers;

            const expectedMarble = '(abc|)';
            const expectedValues = {
                a: [1, 2],
                b: [3, 4],
                c: [5, 6],
            };

            expectObservable(obs$).toBe(expectedMarble, expectedValues);
        });
    });

    test('Emits the last two emits as an array, starts on every emit', () => {
        const obs$ = of(1, 2, 3, 4, 5, 6).pipe(
            bufferCount(2, 1),
        );

        testScheduler.run(helpers => {
            const { expectObservable } = helpers;

            const expectedMarble = '(abcdef|)';
            const expectedValues = {
                a: [1, 2],
                b: [2, 3],
                c: [3, 4],
                d: [4, 5],
                e: [5, 6],
                f: [6],
            };

            expectObservable(obs$).toBe(expectedMarble, expectedValues);
        });
    });
});
