import { finalize, fromEvent, take } from 'rxjs';
import EventEmitter from 'events';

test('fromEvent', done => {
    const eventEmitter = new EventEmitter();

    const obs$ = fromEvent(eventEmitter, 'start');

    obs$.pipe(
        take(1),
        finalize(() => done()),
    ).subscribe(actual => {
        expect(actual).toBe(1);
    });

    eventEmitter.emit('start', 1);
});
