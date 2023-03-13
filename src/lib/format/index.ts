import type { PhoneNumberType } from '../../types/PhoneNumber';

export function formatLink(number: PhoneNumberType, message: string) {
	return `https://wa.me/${number.value.replace('+', '')}${
		message.trim() ? `?text=${encodeURI(message.trim())}` : ''
	}`;
}
