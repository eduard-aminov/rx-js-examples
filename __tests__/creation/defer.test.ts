import { TestScheduler } from 'rxjs/testing';
import { defer, of } from 'rxjs';

let testScheduler: TestScheduler;

beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
    });
});

test('defer', () => {
    const obs$ = defer(() => {
        return 2 > 1 ? of(2) : of(1);
    });

    testScheduler.run(helpers => {
        const { expectObservable } = helpers;

        const expectedMarble = '(a|)';
        const expectedValues = {
            a: 2,
        };

        expectObservable(obs$).toBe(expectedMarble, expectedValues);
    });
});
