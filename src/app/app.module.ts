import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {HttpClientModule, HTTP_INTERCEPTORS, HttpClientXsrfModule} from '@angular/common/http';

import {AboutPage} from '../pages/about/about';
import {ContactPage} from '../pages/contact/contact';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import {UsersPage} from '../pages/users/users';
import {DemoService} from "../services/demo.service";

// import {GithubAuthInterceptor} from "./app.interceptor";

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

@NgModule({
	declarations: [
		MyApp,
		AboutPage,
		ContactPage,
		HomePage,
		TabsPage,
		UsersPage
	],
	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp),
		HttpClientModule,
		// HttpClientXsrfModule.withOptions({
		// 	cookieName: 'My-Xsrf-Cookie', // this is optional
		// 	headerName: 'My-Xsrf-Header' // this is optional
		// })
		// HttpClientXsrfModule.withConfig({
		// 	cookieName: 'My-Xsrf-Cookie', // this is optional
		// 	headerName: 'My-Xsrf-Header' // this is optional
		// })
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		AboutPage,
		ContactPage,
		HomePage,
		TabsPage,
		UsersPage
	],
	providers: [
		StatusBar,
		SplashScreen,
		{provide: ErrorHandler, useClass: IonicErrorHandler},
		DemoService
		// HttpXsrfInterceptor,
		// {
		// 	provide: HTTP_INTERCEPTORS,
		// 	useClass: GithubAuthInterceptor,
		// 	multi: true
		// },
		// { provide: 'LOCALSTORAGE', useFactory: getLocalStorage }
		// { provide: HTTP_INTERCEPTORS, useExisting: HttpXsrfInterceptor, multi: true },
		// { provide: HttpXsrfTokenExtractor, useClass: HttpXsrfCookieExtractor },
		// { provide: XSRF_COOKIE_NAME, useValue: 'XSRF-TOKEN' },
		// { provide: XSRF_HEADER_NAME, useValue: 'X-XSRF-TOKEN' },
	]
})
export class AppModule {
}

export function getLocalStorage() {
	return (typeof window !== "undefined") ? window.localStorage : null;
}