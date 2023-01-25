import { TestScheduler } from 'rxjs/testing';
import { interval, merge, take } from 'rxjs';

let testScheduler: TestScheduler;

beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
    });
});

describe('merge', () => {
    test('merge together 3 Observables, but run only 2 concurrently', () => {
        const timer1 = interval(1000).pipe(take(2));
        const timer2 = interval(2000).pipe(take(3));
        const timer3 = interval(500).pipe(take(2));

        const concurrent = 2;
        const obs$ = merge(timer1, timer2, timer3, concurrent);

        testScheduler.run(helpers => {
            const { expectObservable } = helpers;

            const expectedMarble = '1s a 999ms (bc) 496ms f 499ms g 999ms d 1999ms (e|) ';
            const expectedValues = {
                a: 0,
                b: 1,
                c: 0,
                d: 1,
                e: 2,
                f: 0,
                g: 1,
            };

            expectObservable(obs$).toBe(expectedMarble, expectedValues);
        });
    });
});
