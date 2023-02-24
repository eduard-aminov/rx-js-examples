import { TestScheduler } from 'rxjs/testing';
import { bufferWhen, interval, take, timer } from 'rxjs';

let testScheduler: TestScheduler;

beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
    });
});

describe('bufferWhen', () => {
    test('Every second, emits an array of the recent emits', () => {
        const emits$ = timer(0, 200).pipe(take(10));
        const obs$ = emits$.pipe(
            bufferWhen(() => interval(1000)),
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
