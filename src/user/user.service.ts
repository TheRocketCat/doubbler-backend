import { Injectable } from '@nestjs/common';

class User{
	readonly id:string;
	private _doubloner:number

	private constructor(
		private phoneNumber:string
	){}

	static create(phoneNumber:string){
		//TODO validate phone number
		return new User(phoneNumber);
	}

	get doubloner(){
		return this._doubloner;
	}
}

@Injectable()
export class UserRep {
	private users:User[] = [];

	createUser(phoneNumber:string){
		const user = User.create(phoneNumber);
		this.users.push(user);
	}

	getDoubloner(id:string){
		const user = this.users.find(user => user.id === id);
		return user.doubloner;
	}
}
