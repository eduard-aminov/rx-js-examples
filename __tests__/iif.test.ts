import { TestScheduler } from 'rxjs/testing';
import { iif, of } from 'rxjs';

let testScheduler: TestScheduler;

beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
    });
});

test('iif pass first observable to subscription', () => {
    const obs$ = iif(
        () => true,
        of(true),
        of(false),
    );

    testScheduler.run(helpers => {
        const { expectObservable } = helpers;

        const expectedMarble = '(a|)';
        const expectedValues = {
            a: true,
        };

        expectObservable(obs$).toBe(expectedMarble, expectedValues);
    });
});

test('iif pass second observable to subscription', () => {
    const obs$ = iif(
        () => false,
        of(true),
        of(false),
    );

    testScheduler.run(helpers => {
        const { expectObservable } = helpers;

        const expectedMarble = '(a|)';
        const expectedValues = {
            a: false,
        };

        expectObservable(obs$).toBe(expectedMarble, expectedValues);
    });
});
