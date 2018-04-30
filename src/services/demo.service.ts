import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';

import {User} from "../types/user";

const apiUrl = 'http://api.shawnnolan.com/';

@Injectable()
export class DemoService {
	constructor(private http: HttpClient) {}

	getPhrases(token) {
		return this.http.get(apiUrl + 'wp-json/ngapp/v1/phrases', this.bearerAuth(token));
	}

	loginUser (usr: User): Observable<User> {
		return this.http.post<User>(apiUrl + 'wp-json/jwt-auth/v1/token', usr).pipe(
			tap((usr: User) => ''),
			catchError(this.handleError<User>('failed to login.'))
		);
	}

	// @todo: convert to static method
	bearerAuth(token) {
		return {
			headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token })
		};
	}

	validateToken(token) {
		return this.http.post(apiUrl + 'wp-json/jwt-auth/v1/token/validate', {}, this.bearerAuth(token)).pipe(
			tap((token) => ''),
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