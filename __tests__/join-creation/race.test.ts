import { TestScheduler } from 'rxjs/testing';
import { interval, map, race, take } from 'rxjs';

let testScheduler: TestScheduler;

beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
    });
});

describe('race', () => {
    test('subscribes to the observable that was the first to start emitting', () => {
        const obs1$ = interval(7000).pipe(take(3), map(() => 'slow one'));
        const obs2$ = interval(3000).pipe(take(3), map(() => 'fast one'));
        const obs3$ = interval(5000).pipe(take(3), map(() => 'medium one'));

        const obs$ = race(obs1$, obs2$, obs3$);

        testScheduler.run(helpers => {
            const { expectObservable } = helpers;

            const expectedMarble = '3s a 2999ms b 2999ms (c|)';
            const expectedValues = {
                a: 'fast one',
                b: 'fast one',
                c: 'fast one',
            };

            expectObservable(obs$).toBe(expectedMarble, expectedValues);
        });
    });
});
