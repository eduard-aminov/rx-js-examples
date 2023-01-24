import { TestScheduler } from 'rxjs/testing';
import { generate } from 'rxjs';

let testScheduler: TestScheduler;

beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
    });
});

test('generate', () => {
    testScheduler.run(helpers => {
        const { expectObservable } = helpers;

        const obs$ = generate({
            initialState: 0,
            condition: x => x < 3,
            iterate: x => x + 1
        });

        const expectedMarble = '(abc|)';
        const expectedValues = {
            a: 0,
            b: 1,
            c: 2,
        };

        expectObservable(obs$).toBe(expectedMarble, expectedValues);
    });
});
