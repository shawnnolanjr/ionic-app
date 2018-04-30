import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import { NgForm } from '@angular/forms';

import {DemoService} from "../../services/demo.service";
import {User} from "../../types/user";

/**
 * Generated class for the UsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-users',
	templateUrl: 'users.html',
})
export class UsersPage {
	constructor(public navCtrl: NavController, public navParams: NavParams, private demoService: DemoService) {
	}

	ionViewDidLoad() {
		// this.getUserLogin();
		// this.getTokenValidate();
	}

	getUserLogin(user: NgForm) {
		let userData = new User();
		userData.username = user.value.username;
		userData.password = user.value.password;
		this.demoService.loginUser(userData as User)
			.subscribe(hero => {
				if(hero && hero.token) {
					this.getTokenValidate(hero.token)
				}
			});
	}

	getTokenValidate(token) : void {
		if(token) {
			this.demoService.validateToken(token)
				.subscribe(toke => {
					console.log('toke', toke);
				});
		}
	}

	getPost(id) {

	}
}
