import { Controller,Post,Req,Res,Body,HttpCode } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(
		private authServ: AuthService,
	) { }


	@HttpCode(200)
	@Post("login")
	async login(@Body() body: Record<string, any>) {
		return this.authServ.login(body);
	}
}
