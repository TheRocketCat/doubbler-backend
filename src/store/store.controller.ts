import { Controller,Get,Post,Body,UseGuards } from '@nestjs/common';

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

	@Post("kwikk-payment-hook")
	kwikkPaymentHook(@Body() dto: KwikkPaymentHookDTO){
		this.storeUC.kwikkPaymentHook(dto);
	}
}
