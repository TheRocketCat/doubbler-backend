import { HttpCode,Controller, Get,Post,Body,UseGuards,Param,Req,Res } from '@nestjs/common';
import { Request,Response } from 'express';

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
		console.log(userId)

		const res=await this.storeUC.buyOffer(userId,offerId);
		if(res instanceof Error){
			return {error:res.message};
		}
		return res;
	}

	// Used when you want to use the code
	// probably called by store owner and not user
	@UseGuards(AuthGuard)
	@Post("use-code")
	async UseCode(@Req() req:Request,@Res() res:Response, @Body() dto: {code:string}){
		//@ts-ignore
		const userId=req.user.sub;
		const err=await this.storeUC.useCode(userId,dto.code);
		if(err instanceof Error){
			res.status(400).send({error:err.message});
		}
		res.status(201).send();
	}

	// check if code is valid
	// more used as a middle step for the users to check final price
	@UseGuards(AuthGuard)
	@HttpCode(200)
	@Post("check-code-validity")
	async checkCode(@Req() req:Request,@Res() res:Response, @Body() dto: {code:string}){
		//@ts-ignore
		const userId=req.user.sub;
		const result=await this.storeUC.checkCode(userId,dto.code);
		if(result instanceof Error){
			return res.status(400).send({error:result.message});
		}

		return res.status(200).send({result});
	}

	@Post("kwikk-payment-hook")
	async kwikkPaymentHook(@Body() dto: KwikkPaymentHookDTO){
		// TODO verify hook signatures, to avoid false payments - talk to kwikk about this
		const result=this.storeUC.kwikkPaymentHook(dto);
		return result;
	}
}
