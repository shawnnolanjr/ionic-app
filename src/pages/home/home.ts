import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	firstName: string;
	constructor(public navCtrl: NavController) {
		this.firstName = 'shawn nolan';
	}

}
