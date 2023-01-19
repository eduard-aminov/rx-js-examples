import { TestScheduler } from 'rxjs/testing';
import { throwError } from 'rxjs';

let testScheduler: TestScheduler;

beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
    });
});

test('throw error', () => {
    testScheduler.run(helpers => {
        const obs$ = throwError(() => 'some error');

        const { expectObservable } = helpers;

        const expectedMarble = '#';
        const expectedErrorValue = 'some error';

        expectObservable(obs$).toBe(expectedMarble, null, expectedErrorValue);
    });
});
