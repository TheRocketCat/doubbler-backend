import { IsString, IsEmail,IsPhoneNumber,MinLength, IsNotEmpty } from 'class-validator';

export class RegisterUserDto{
	@IsString()
	@IsNotEmpty()
	username: string;

	@IsPhoneNumber()
	phoneNumber: string;

	@IsEmail()
	email: string;

	@MinLength(8)
	@IsString()
	password: string;

	@IsNotEmpty()
	@IsString()
	oneTimeCode: string;
}
