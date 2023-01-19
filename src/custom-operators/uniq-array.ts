import { map, OperatorFunction, pipe } from 'rxjs';

export const uniqArray = <T>(key?: T extends object ? keyof T : undefined): OperatorFunction<T[][], T[]> => {
    return pipe(
        map(arrays => {
            const flattenArray = arrays.flat();

            if (!key) {
                return Array.from(new Set(flattenArray));
            }

            const dict = new Map();

            for (let i = 0; i < flattenArray.length; i++) {
                if (!dict.has(flattenArray[i]![key])) {
                    dict.set(flattenArray[i]![key], flattenArray[i]) ;
                }
            }

            return Array.from(dict.values());
        }),
    )
};
