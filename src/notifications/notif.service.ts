import {Injectable} from '@nestjs/common';

@Injectable()
export class NotifService {
	oneTimeCode={}

	//TODO proper system - tellio?
	//send a one time link
	sendOneTimeCode(phoneNumber: string) {
		const code = Math.floor(100000 + Math.random() * 900000);
		this.oneTimeCode[phoneNumber] = code;
		console.log(code)
	}

	verifyOneTimeCode(phoneNumber: string, code: number) {
		const codeCorrect=this.oneTimeCode[phoneNumber] === code;
		if(codeCorrect){
			delete this.oneTimeCode[phoneNumber];
		}
		return codeCorrect;
	}
}
