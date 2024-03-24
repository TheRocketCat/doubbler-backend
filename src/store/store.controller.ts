import { Controller,Get,Post,Body,UseGuards,Param } from '@nestjs/common';

import { StoreRepository } from './store.repository';
import { StoreUsecases } from './store.usecases';

import { KwikkPaymentHookDTO } from './dto';

import { AuthGuard } from '~/auth/auth.guard';

@Controller('store')
export class StoreController {
	constructor(
		private storeRep: StoreRepository,
		private storeUC: StoreUsecases
	) { }

	@UseGuards(AuthGuard)
	@Get("offers")
	getOffers(){
		return this.storeRep.getOffers();
	}

	@UseGuards(AuthGuard)
	@Post("buy/:offerId")
	buyOffer(@Param("offerId") offerId: string){
		//@ts-ignore
		const userId=this.req.user.sub;

		return this.storeUC.buyOffer(userId,offerId);
	}

	@Post("kwikk-payment-hook")
	kwikkPaymentHook(@Body() dto: KwikkPaymentHookDTO){
		this.storeUC.kwikkPaymentHook(dto);
	}
}
