import { Injectable } from '@nestjs/common';

export class Offer{
	constructor(
		readonly id:string,
		readonly companyId:string,
		private _name:string,
		private _doublonerPrice:number,
	){}

	get doubloner(){
		return this._doublonerPrice;
	}

	get name(){
		return this._name;
	}

	get price(){
		return this._doublonerPrice;
	}
}

@Injectable()
export class StoreRepository {
	private _offers:Offer[] = [
		new Offer("1","1", "t-shirt", 300),
		new Offer("2","2", "20% of a ride", 900),
		new Offer("3","3", "1 Ticket to Madonna", 50000),
		new Offer("4",",4", "Coffee", 50),
	];

	private stores=[
		{
			id:"1",
			name:"H&M",
			offers:[ ],
		},
		{
			id:"2",
			name:"Uber",
			offers:[ ],
		},
		{
			id:"3",
			name:"Ticketmaster",
			offers:[ ],
		},
		{
			id:"4",
			name:"Starbucks",
			offers:[ ],
		},
	]

	private _codes=[
		{
			companyId:"1",
			userId:"1",
			offerId:"1",
			code:"1234",
		}
	]

	getOffers(){
		return this._offers;
	}

	addCode(userId:string, offerId:string,storeId:string){
		const codenumber=Math.random().toString(36).substring(7)
		const code={
			companyId:storeId,
			userId,
			offerId,
			code:codenumber,
		}
		this._codes.push(code);
		return code
	}

	getUserCodes(id:string){
		return this._codes;
	}

	async getOfferById(id:string){
		return this._offers.find(offer=>offer.id===id);
	}

	async getOfferByCode(code:string){
		return this._codes.find(c=>c.code===code);
	}
}
