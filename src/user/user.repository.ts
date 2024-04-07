import { Injectable } from '@nestjs/common';

export class User{

	private constructor(
		readonly id:string,
		private _phoneNumber:string,
		private _doubloner:number = 0,
		private _username:string = "",
		private _password="",
		private _verified:boolean = false
	){}

	verifyUser(username:string = "", password:string = ""){
		this._username = username;
		this._password = password;
		this._verified = true;
	}

	static createUnverifiedUser(id:string,phoneNumber:string, doubloner:number = 0){
		return new User(id,phoneNumber, doubloner);
	}

	addDoubloner(amount:number){
		this._doubloner += amount;
	}

	removeDoubloner(amount:number){
		this._doubloner -= amount;
	}

	get doubloner(){
		return this._doubloner;
	}

	get phoneNumber(){
		return this._phoneNumber;
	}

	get username(){
		return this._username;
	}

	get password(){
		return this._password;
	}

	get verified(){ return this._verified; }
}

@Injectable()
export class UserRep {
	private users:User[] = [
		User.createUnverifiedUser("1","123456789"),
	];

	constructor(){
		const user = User.createUnverifiedUser("2","987654321", 1000);
		user.verifyUser("user","password");
		this.users.push(user);
	}

	createUser(phoneNumber:string, doubloner:number = 0){
		const user = User.createUnverifiedUser(
			String(this.users.length-1),
			phoneNumber,
			doubloner
		);

		this.users.push(user);
	}

	updateUser(user:User){
		const index = this.users.findIndex(u => u.id === user.id);
		if(index < 0){
			throw new Error("User not found");
		}
		this.users[index] = user;
	}

	getDoubloner(id:string){
		const user = this.users.find(user => user.id === id);
		return user.doubloner;
	}

	getUserByPhone(phone:string):User | undefined{
		return this.users.find(user => user.phoneNumber === phone);
	}

	getUserByLogin(username:string, password:string){
		return this.users.find(user =>{
			return user.username === username && user.password === password &&
			user.verified;
		});
	}

	async getUserById(id:string){
		return this.users.find(user => user.id === id);
	}
}
