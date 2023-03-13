import { formatLink } from '$lib/format';
import { phoneNumbers } from '../../stores/phoneNumber';
import type { PhoneNumberType } from '../../types/PhoneNumber';

export function copyLink(number: PhoneNumberType, message: string) {
	navigator.clipboard.writeText(formatLink(number, message));
}

export function copyAll(message: string) {
	let _phoneNumbers: PhoneNumberType[] = [];
	const unsubscribe = phoneNumbers.subscribe((value) => (_phoneNumbers = value));
	const phones = _phoneNumbers
		.filter((num) => num.valid && num.value !== '')
		.map(
			(num) =>
				`https://wa.me/${num.value.replace('+', '')}${
					message.trim() ? `?text=${encodeURI(message.trim())}` : ''
				}`
		)
		.join('\n');

	navigator.clipboard.writeText(phones);
	unsubscribe();
}
