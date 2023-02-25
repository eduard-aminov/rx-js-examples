import { TestScheduler } from 'rxjs/testing';
import { groupBy, mergeMap, of, toArray } from 'rxjs';

let testScheduler: TestScheduler;

beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
    });
});

describe('groupBy', () => {
    test('Group objects by id and return as array', () => {
        const emits$ = of(
            { id: 1, name: 'JavaScript' },
            { id: 2, name: 'Parcel' },
            { id: 2, name: 'webpack' },
            { id: 1, name: 'TypeScript' },
            { id: 3, name: 'TSLint' }
        );
        const obs$ = emits$.pipe(
            groupBy(p => p.id),
            mergeMap(group$ => group$.pipe(toArray()))
        );

        testScheduler.run(helpers => {
            const { expectObservable } = helpers;

            const expectedMarble = '(abc|)';
            const expectedValues = {
                a: [{ id: 1, name: 'JavaScript' }, { id: 1, name: 'TypeScript' }],
                b: [{ id: 2, name: 'Parcel' }, { id: 2, name: 'webpack' }],
                c: [{ id: 3, name: 'TSLint' }],
            };

            expectObservable(obs$).toBe(expectedMarble, expectedValues);
        });
    });
});

describe('groupBy', () => {
    test('Group objects by id and extracts return element for each item and return as array', () => {
        const emits$ = of(
            { id: 1, name: 'JavaScript' },
            { id: 2, name: 'Parcel' },
            { id: 2, name: 'webpack' },
            { id: 1, name: 'TypeScript' },
            { id: 3, name: 'TSLint' }
        );
        const obs$ = emits$.pipe(
            groupBy(p => p.id, { element: p => p.name }),
            mergeMap(group$ => group$.pipe(toArray()))
        );

        testScheduler.run(helpers => {
            const { expectObservable } = helpers;

            const expectedMarble = '(abc|)';
            const expectedValues = {
                a: ['JavaScript', 'TypeScript'],
                b: ['Parcel', 'webpack'],
                c: ['TSLint'],
            };

            expectObservable(obs$).toBe(expectedMarble, expectedValues);
        });
    });
});
