import { Controller,Res,Req,Get,Body,Post,UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

import { UserRep } from './user.repository';
import { AuthGuard } from '~/auth/auth.guard';

import { RegisterUserDto } from './dto';
import {UserUC} from './usecases';

@Controller('user')
export class UserController {
	constructor(
		private usersRep: UserRep,
		private userUC: UserUC
	) { }

	@UseGuards(AuthGuard)
	@Get("doubloner")
	async getDoubloner(@Req() req: Request, @Res() res: Response) {
		//@ts-ignore
		const id = req.user.sub;
		//@ts-ignore
		console.log("user:", req.user);

		const doubloner = this.usersRep.getDoubloner(id);
		res.json({doubloner});
	}

	@Post("register")
	async firstLogin(@Req() req: Request, @Res() res: Response, @Body() dto: RegisterUserDto) {
		const codeCorrect=await this.userUC.firstLogin(dto);
		if(codeCorrect instanceof Error){
			res.status(400).send({error:codeCorrect.message});
			return;
		}
		res.send({success:true});
	}
}
