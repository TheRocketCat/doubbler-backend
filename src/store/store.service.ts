import { Injectable } from '@nestjs/common';

export class Offer{
	constructor(
		readonly id:string,
		private _name:string,
		private _doublonerPrice:number,
	){}

	get doubloner(){
		return this._doublonerPrice;
	}

	get name(){
		return this._name;
	}
}

@Injectable()
export class StoreService {
	private _offers:Offer[] = [
		new Offer("1", "t-shirt", 300),
		new Offer("2", "Uber", 900),
		new Offer("3", "1 Ticket to Madonna", 900),
		new Offer("4", "Coffee", 50),
	];

	getOffers(){
		return this._offers;
	}
}
