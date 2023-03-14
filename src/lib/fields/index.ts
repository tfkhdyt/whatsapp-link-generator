import { idIncrement, phoneNumbers } from '$stores/phoneNumber';

export function addField() {
	let _idIncrement: number;
	const unsubscribe = idIncrement.subscribe((value) => (_idIncrement = value));

	phoneNumbers.update((num) => [...num, { id: _idIncrement, value: '', valid: true }]);
	idIncrement.update((value) => value + 1);

	unsubscribe();
}

export function removeField(id: number) {
	phoneNumbers.update((value) => value.filter((num) => num.id !== id));
}
