// TODO
// what will the exchange rate for doubbloner be
// 27 of amount cant be equal to 27 doublonner
// cuz of different currencies
// either 1 sek = 1 doubbloner and hence 1 euro = 11 doubloner when 1 euro = 11 sek
// or account is set into a single currency
// creates different challenges
export interface KwikkPaymentHookDTO {
	amount: number;
	currency: string;
	phoneNumber: string;
}
