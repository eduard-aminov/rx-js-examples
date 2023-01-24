import { TestScheduler } from 'rxjs/testing';
import { combineLatest, take, timer } from 'rxjs';

let testScheduler: TestScheduler;

beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
    });
});

test('combineLatest', () => {
    const firstTimer$ = timer(0, 1000);
    const secondTimer$ = timer(500, 1000);
    const obs$ = combineLatest([firstTimer$, secondTimer$]).pipe(take(4));

    testScheduler.run(helpers => {
        const { expectObservable } = helpers;

        const expectedMarble = '500ms a 499ms b 499ms c 499ms (d|)';
        const expectedValues = {
            a: [0, 0],
            b: [1, 0],
            c: [1, 1],
            d: [2, 1],
        };

        expectObservable(obs$).toBe(expectedMarble, expectedValues);
    });
});
