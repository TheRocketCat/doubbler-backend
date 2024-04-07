import {Injectable} from '@nestjs/common';

import {StoreRepository} from './store.repository';
import {UserRep} from '~/user/user.repository';
import {NotifService} from '~/notifications/notif.service';

import {KwikkPaymentHookDTO} from './dto';

@Injectable()
export class StoreUsecases {
	constructor(
		private storeRep: StoreRepository,
		private userRep: UserRep,
		private notifService: NotifService
	) {}

	kwikkPaymentHook(dto: KwikkPaymentHookDTO) {
		const user=this.userRep.getUserByPhone(dto.phoneNumber);
		if(user){
			user.addDoubloner(dto.amount);
		}else{
			this.userRep.createUser(dto.phoneNumber, dto.amount);
			this.notifService.sendOneTimeCode(dto.phoneNumber);
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

		return {success:true, doubloner:user.doubloner};
	}
}
