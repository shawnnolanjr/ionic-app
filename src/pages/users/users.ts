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
	public showHideAtt: string;
	public loading: string;
	public user: object;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private demoService: DemoService,
		// private router: Route
	) {
		this.showHide = 'Show';
		this.showHideAtt = 'password';
	}

	ionViewDidLoad() {
		this.setUser();
	}

	setUser():void {
		let currentUser = JSON.parse(localStorage.getItem('currentUser'));
		let token = null;
		if(currentUser && currentUser.token) {
			token = currentUser.token; // your token
			this.getPhrases(token);
			this.user = {
				username: currentUser.username,
				token: currentUser.token
			};
		}
	}

	// copyToClipboard(text) {
	// 	window.prompt("Copy to clipboard: Ctrl+C || cmd+C, Enter", text);
	// }

	clickShowHide() {
		let inputAttr = this.showHideAtt;
		if(inputAttr == 'text') {
			this.showHide = 'Show';
			this.showHideAtt = 'password';
		} else {
			this.showHide = 'Hide';
			this.showHideAtt = 'text';
		}
	}

	getUserLogin(user: NgForm) {
		this.loading = 'Loading content';
		let userData = new User();
		userData.username = user.value.username;
		userData.password = user.value.password;
		if (userData.username && userData.password) {
			this.demoService.loginUser(userData as User)
				.subscribe(usr => {
					if (usr && usr.token) {
						this.getTokenValidate(usr.token);
						this.getPhrases(usr.token);
						this.loading = null;
						localStorage.setItem('currentUser', JSON.stringify({ token: usr.token, username: userData.username }));
						this.setUser();
					} else {
						this.loading = 'something went wrong';
					}
				});
		}
	}

	getTokenValidate(token): void {
		if (token) {
			this.demoService.validateToken(token)
				.subscribe(toke => { });
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