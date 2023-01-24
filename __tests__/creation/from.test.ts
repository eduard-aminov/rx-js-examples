import { TestScheduler } from 'rxjs/testing';
import { finalize, from } from 'rxjs';

let testScheduler: TestScheduler;

beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
    });
});

test('from input as array', () => {
    const obs$ = from([ 1, 2, 3 ]);

    testScheduler.run(helpers => {
        const { expectObservable } = helpers;

        const expectedMarble = '(abc|)';
        const expectedValues = {
            a: 1,
            b: 2,
            c: 3,
        };

        expectObservable(obs$).toBe(expectedMarble, expectedValues);
    });
});

test('from input as promise', done => {
    const obs$ = from(Promise.resolve('some value'));

    obs$.pipe(finalize(() => done())).subscribe(value => {
        expect(value).toBe('some value');
    })
});

