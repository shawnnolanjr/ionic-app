import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';

import {User} from "../types/user";

// const authHttpOptions = {
// 	headers: new HttpHeaders({ 'Authorization': 'application/x-www-form-urlencoded' })
// };

@Injectable()
export class DemoService {
	apiUrl = 'http://api.shawnnolan.com/';

	constructor(private http: HttpClient) {}

	// Uses http.get() to load data from a single API endpoint
	getPost() {
		return this.http.get('http://api.shawnnolan.com/wp-json/wp/v2/posts/1');
	}

	/** POST: add a new hero to the server */
	loginUser (hero: User): Observable<User> {
		return this.http.post<User>(this.apiUrl + 'wp-json/jwt-auth/v1/token', hero).pipe(
			tap((hero: User) => console.log(`hero token: ${hero.token}`)),
			catchError(this.handleError<User>('failed to login.'))
		);
	}

	validateToken(token) {
		const authHttpOptions = {
			headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token })
		};
		return this.http.post(this.apiUrl + 'wp-json/jwt-auth/v1/token/validate', {}, authHttpOptions).pipe(
			tap((token) => console.log(`hero validate: ${token}`)),
			catchError(this.handleError('token failed.'))
		);
	}

	/**
	 * Handle Http operation that failed.
	 * Let the app continue.
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
	private handleError<T> (operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {

			// TODO: send the error to remote logging infrastructure
			console.error('handleError', error); // log to console instead

			// TODO: better job of transforming error for user consumption
			console.log(`${operation} failed: ${error.message}`);

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}

	/** Log a HeroService message with the MessageService */
	// private log(message: string) {
	// 	this.messageService.add('HeroService: ' + message);
	// }
}