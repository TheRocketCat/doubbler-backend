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


