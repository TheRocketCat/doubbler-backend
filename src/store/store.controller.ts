import { Controller,Get,Post,Body,UseGuards,Param,Req } from '@nestjs/common';

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
	@Get("codes")
	getMyCodes(@Req() req:Request){
		//@ts-ignore
		const userId=req.user.sub;

		return this.storeRep.getUserCodes(userId);
	}

	@UseGuards(AuthGuard)
	@Post("buy/:offerId")
	async buyOffer(@Req() req:Request, @Param("offerId") offerId: string){
		//@ts-ignore
		const userId=req.user.sub;

		const res=await this.storeUC.buyOffer(userId,offerId);
		if(res instanceof Error){
			return {error:res.message};
		}
		return res;
	}

	@UseGuards(AuthGuard)
	@Post("validate-code")
	async validateCode(@Req() req:Request, @Body() dto: {code:string}){

	}

	@Post("kwikk-payment-hook")
	kwikkPaymentHook(@Body() dto: KwikkPaymentHookDTO){
		this.storeUC.kwikkPaymentHook(dto);
	}
}
