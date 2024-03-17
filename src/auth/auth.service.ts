import { Injectable,UnauthorizedException,BadRequestException } from '@nestjs/common';

import {JwtService} from '@nestjs/jwt';

import { UserRep } from '~/user/user.repository';

@Injectable()
export class AuthService {
	constructor(
		private usersRep: UserRep,
		private jwtService: JwtService
	) { }

	async login(body:any){
		const user = this.usersRep.getUserByLogin(body.username, body.password);
		console.log(user);
		if(!user){
			throw new UnauthorizedException();
		}
		if(!user.verified){
			throw new BadRequestException("User not verified");
		}
		
		//const {password, ...result} = user;

		const payload = {sub: user.id, username: user.username};

		return {
			access_token: await this.jwtService.signAsync(payload),
		}
	}
}
