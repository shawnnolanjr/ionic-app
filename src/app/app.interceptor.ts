import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import {HttpXsrfTokenExtractor} from "@angular/common/http";

@Injectable()
// export class GithubAuthInterceptor implements HttpInterceptor {
// 	intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
// 		const authReq = req.clone({
// 			headers: req.headers.set('Authorization', 'token <your GitHub token>')
// 		});
// 		return next.handle(authReq);
// 	}
// }
export class GithubAuthInterceptor implements HttpInterceptor {
	constructor(private tokenExtractor: HttpXsrfTokenExtractor) {
	}
	// intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
	// 	const headerName = 'X-XSRF-TOKEN';
	// 	let token = this.tokenExtractor.getToken() as string;
	// 	if (token !== null && !req.headers.has(headerName)) {
	// 		req = req.clone({ headers: req.headers.set(headerName, token) });
	// 	}
	// 	return next.handle(req);
	// }
	intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req);
	}
}