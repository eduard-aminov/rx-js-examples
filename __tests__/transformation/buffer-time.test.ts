import { TestScheduler } from 'rxjs/testing';
import { bufferTime, take, timer } from 'rxjs';

let testScheduler: TestScheduler;

beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
    });
});

describe('bufferTime', () => {
    test('Every second, emits an array of the recent emits', () => {
        const obs$ = timer(0, 200).pipe(
            take(10),
            bufferTime(1000),
        );

        testScheduler.run(helpers => {
            const { expectObservable } = helpers;

            const expectedMarble = '1s a 799ms (b|)';
            const expectedValues = {
                a: [0, 1, 2, 3, 4],
                b: [5, 6, 7, 8, 9],
            };

            expectObservable(obs$).toBe(expectedMarble, expectedValues);
        });
    });
});
