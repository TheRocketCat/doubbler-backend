import { Controller,Res,Req,Get,Body,Post,UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

import { UserRep } from './user.repository';
import { AuthGuard } from '~/auth/auth.guard';

@Controller('user')
export class UserController {
	constructor(
		private usersRep: UserRep
	) { }

	@Get("new-user-hook")
	async newUserHook(@Req() req: Request, @Res() res: Response, @Body() body: any) {
		this.usersRep.createUser(body.phoneNumber);
	}

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
}
