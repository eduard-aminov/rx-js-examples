import { TestScheduler } from 'rxjs/testing';
import { interval, take } from 'rxjs';

let testScheduler: TestScheduler;

beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
    });
});

test('interval', () => {
    testScheduler.run(helpers => {
        const obs$ = interval(10).pipe(take(3));

        const { expectObservable } = helpers;

        const expectedMarble = '10ms a 9ms b 9ms (c|)';
        const expectedValues = {
            a: 0,
            b: 1,
            c: 2,
        };

        expectObservable(obs$).toBe(expectedMarble, expectedValues);
    });
});
