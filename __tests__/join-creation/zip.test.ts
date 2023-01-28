import { TestScheduler } from 'rxjs/testing';
import { map, of, zip } from 'rxjs';

let testScheduler: TestScheduler;

beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
    });
});

describe('zip', () => {
    test('combine age and name from different sources', () => {
        const age$ = of(27, 25, 29);
        const name$ = of('Foo', 'Bar', 'Beer');
        const isDev$ = of(true, true, false);

        const obs$ = zip(age$, name$, isDev$).pipe(
            map(([age, name, isDev]) => ({ age, name, isDev }))
        );

        testScheduler.run(helpers => {
            const { expectObservable } = helpers;

            const expectedMarble = '(abc|)';
            const expectedValues = {
                a: { age: 27, name: 'Foo', isDev: true },
                b: { age: 25, name: 'Bar', isDev: true },
                c: { age: 29, name: 'Beer', isDev: false },
            };

            expectObservable(obs$).toBe(expectedMarble, expectedValues);
        });
    });
});
