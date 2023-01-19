import { ajax } from 'rxjs/ajax';
import { catchError, of } from 'rxjs';

/** Создает Observable для Ajax-запроса,
 * содержащего либо объект запроса с url,
 * заголовками и т.д., либо строку URL.
 **/
ajax.getJSON('https://api.github.com/users?per_page=5').pipe(
    catchError(error => of(error))
).subscribe();
