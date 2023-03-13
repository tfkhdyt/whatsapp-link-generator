import { writable } from 'svelte/store';
import type { PhoneNumberType } from '../types/PhoneNumber';

export const phoneNumbers = writable<PhoneNumberType[]>([
	{
		id: 0,
		value: '',
		valid: true
	}
]);
export const idIncrement = writable(1);
