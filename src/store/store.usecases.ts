import {Injectable} from '@nestjs/common';

import {StoreRepository} from './store.repository';
import {UserRep} from '~/user/user.repository';
import {NotifService} from '~/notifications/notif.service';

import {KwikkPaymentHookDTO,KwikkPaymentHookResponseDTO} from './dto';

@Injectable()
export class StoreUsecases {
	constructor(
		private storeRep: StoreRepository,
		private userRep: UserRep,
		private notifService: NotifService
	) {}

	// Creates new user if none exists, adds doubloners to new or existing user
	kwikkPaymentHook(dto: KwikkPaymentHookDTO):KwikkPaymentHookResponseDTO {
		const user=this.userRep.getUserByPhone(dto.phoneNumber);
		if(user){
			user.addDoubloner(dto.amount);
			return {newUser:false};
		}else{
			this.userRep.createUnverifiedUser(dto.phoneNumber, dto.amount);
			// login code
			this.notifService.sendOneTimeCode(dto.phoneNumber);
			return {newUser:true};
		}
	}

	async buyOffer(userId:string,offerId: string) {
		const offer = await this.storeRep.getOfferById(offerId);
		if(!offer){
			throw new Error("Offer not found");
		}
		const user= await this.userRep.getUserById(userId);

		if(user.doubloner<offer.price){
			return new Error("Not enough doubloners");
		}

		user.removeDoubloner(offer.price);
		const code=this.storeRep.addCode(userId,offerId,offer.companyId);

		return {success:true, doubloner:user.doubloner,code};
	}

	async useCode(userId:string,code: string) {
		// check if code exists
		const userCode=this.storeRep.getUserCodeByCode(userId,code);
		if(!userCode){
			return new Error("Code not found");
		}
		
		// delete code
		this.storeRep.deleteCode(userCode.id);
	}

	async checkCode(userId:string,code: string) {
		console.log("checkCode ",userId,code);
		const userCode=this.storeRep.getUserCodeByCode(userId,code);
		const codes=this.storeRep.getUserCodes(userId);
		console.log("userCode",codes);

		if(!userCode){
			return new Error("Code not found");
		}
		return userCode;
	}
}
