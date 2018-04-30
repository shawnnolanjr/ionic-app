import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {NgForm} from '@angular/forms';
// import {Route} from "@angular/compiler/src/core";
// import {Router} from '@angular/router';

import {DemoService} from "../../services/demo.service";
import {User} from "../../types/user";

@IonicPage()
@Component({
	selector: 'page-users',
	templateUrl: 'users.html',
})

export class UsersPage {
	public phrases: object;
	public showHide: string;
	public searchQuery: string = '';
	public items: string[];

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private demoService: DemoService,
		// private router: Route
	) {
		this.showHide = 'Show';
	}

	ionViewDidLoad() {
	}

	getUserLogin(user: NgForm) {
		let userData = new User();
		userData.username = user.value.username;
		userData.password = user.value.password;
		if (userData.username && userData.password) {
			this.demoService.loginUser(userData as User)
				.subscribe(usr => {
					if (usr && usr.token) {
						this.getTokenValidate(usr.token);
						this.getPhrases(usr.token);
					}
				});
		}
	}

	getTokenValidate(token): void {
		if (token) {
			this.demoService.validateToken(token)
				.subscribe(toke => {
					// @todo: need to add token to cookie/session or something in app.interceptor.ts
				});
		}
	}

	getPhrases(token) {
		this.demoService.getPhrases(token)
			.subscribe(phrase => {
				this.phrases = phrase;
				// this.items = phrase;
			});
	}

	/*
	 * @todo: need to finish search
	 */
	// initializeItems() {
	// 	this.phrases;
	// }
	//
	// getItems(ev: any) {
	// 	this.phrases;
	// 	let val = ev.target.value;
	// 	if (val && val.trim() != '') {
	// 		this.items = this.items.filter((item) => {
	// 			return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
	// 		})
	// 	}
	// }
}