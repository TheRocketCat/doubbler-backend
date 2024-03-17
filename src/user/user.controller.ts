import { Controller,Res,Req,Get,Body,Post } from '@nestjs/common';
import { Request, Response } from 'express';

import { UserRep } from './user.repository';

@Controller('user')
export class UserController {
	constructor(
		private usersRep: UserRep
	) { }

	@Get("new-user-hook")
	async newUserHook(@Req() req: Request, @Res() res: Response, @Body() body: any) {
		this.usersRep.createUser(body.phoneNumber);
	}

	@Get(":id/doubloner")
	async getDoubloner(@Req() req: Request, @Res() res: Response) {
		const id = req.params.id;
		const doubloner = this.usersRep.getDoubloner(id);
		res.json({doubloner});
	}
}
