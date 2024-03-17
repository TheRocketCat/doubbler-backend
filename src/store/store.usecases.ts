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
		const user=this.userRep.getUserByPhoner(dto.phoneNumber);
		if(user){
			user.addDoubloner(dto.amount);
		}else{
			this.userRep.createUser(dto.phoneNumber, dto.amount);
			this.notifService.sendOneTimeCode(dto.phoneNumber);
		}
	}
}
