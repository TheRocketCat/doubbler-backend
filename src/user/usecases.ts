import {Injectable} from "@nestjs/common";

import {UserRep} from './user.repository';
import {NotifService} from "~/notifications/notif.service";

import {RegisterUserDto} from './dto';

@Injectable()
export class UserUC{
	constructor(
		private usersRep: UserRep,
		private notifService: NotifService
	) { }

	async firstLogin(dto: RegisterUserDto){
		const {phoneNumber, email, password, oneTimeCode} = dto;
		const codeCorrect = this.notifService.verifyOneTimeCode(phoneNumber, oneTimeCode);
		if(!codeCorrect){
			return new Error("wrong code");
		}
		const user=await this.usersRep.getUserByPhone(phoneNumber);
		console.log("USER: ",user)
		if(!user){
			return new Error("user not found");
		}
		user.verifyUser(dto.username, password);
		await this.usersRep.updateUser(user);
		
		return true;
	}
}
