import { TestScheduler } from 'rxjs/testing';
import { of, switchMap, take, timer } from 'rxjs';

let testScheduler: TestScheduler;

beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
    });
});

test('timer waits 10ms emit 0 and completes', () => {
    testScheduler.run(helpers => {
        const obs$ = timer(10);

        const { expectObservable } = helpers;

        const expectedMarble = '10ms (a|)';
        const expectedValues = {
            a: 0,
        };

        expectObservable(obs$).toBe(expectedMarble, expectedValues);
    });
});

test('timer waits 10ms and start another observable', () => {
    testScheduler.run(helpers => {
        const source$ = of(1, 2, 3);
        const obs$ = timer(10).pipe(switchMap(() => source$));

        const { expectObservable } = helpers;

        const expectedMarble = '10ms (abc|)';
        const expectedValues = {
            a: 1,
            b: 2,
            c: 3,
        };

        expectObservable(obs$).toBe(expectedMarble, expectedValues);
    });
});

test('timer like interval but starts immediately', () => {
    testScheduler.run(helpers => {
        const obs$ = timer(0, 10).pipe(take(3));

        const { expectObservable } = helpers;

        const expectedMarble = 'a 9ms b 9ms (c|)';
        const expectedValues = {
            a: 0,
            b: 1,
            c: 2,
        };

        expectObservable(obs$).toBe(expectedMarble, expectedValues);
    });
});
