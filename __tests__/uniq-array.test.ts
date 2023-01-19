import { TestScheduler } from 'rxjs/testing';
import { forkJoin, of } from 'rxjs';
import { uniqArray } from '../src/custom-operators/uniq-array';

let testScheduler: TestScheduler;

beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
    });
});

test('uniq array simple', () => {
    const obs$ = forkJoin([
        of(['a', 'a', 'b', 'c']),
        of(['a', 'b', 'b', 'd']),
    ]).pipe(
        uniqArray()
    );

    testScheduler.run(helpers => {
        const { expectObservable } = helpers;

        const expectedMarble = '(a|)';
        const expectedValues = {
            a: ['a', 'b', 'c', 'd'],
        };

        expectObservable(obs$).toBe(expectedMarble, expectedValues);
    });
});

test('uniq array with key arg', () => {
    const obs$ = forkJoin([
        of([{ name: 'a' }, { name: 'a' }, { name: 'b' }, { name: 'd' }]),
        of([{ name: 'a' }, { name: 'b' }, { name: 'c' }]),
    ]).pipe(
        uniqArray('name')
    );

    testScheduler.run(helpers => {
        const { expectObservable } = helpers;

        const expectedMarble = '(a|)';
        const expectedValues = {
            a: [{ name: 'a' }, { name: 'b' }, { name: 'd' },  { name: 'c' }],
        };

        expectObservable(obs$).toBe(expectedMarble, expectedValues);
    });
});
