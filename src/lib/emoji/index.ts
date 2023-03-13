// Translates 'a' to '🇦', 'b' to '🇧' and so on.
function letterToLetterEmoji(letter: string): string {
	return String.fromCodePoint(letter.toLowerCase().charCodeAt(0) + 127365);
}

// Translates 'pl' to 'PL', 'en-US' to 'US' and so on.
function countryCodeToCountry(countryCode: string): string {
	const country = countryCode.split('-').pop() as string;

	return country.toUpperCase();
}

// Translates 'pl-PL' to 🇵🇱 and so on.
export function countryCodeToFlagEmoji(countryCode: string): string {
	if (!countryCode) {
		throw new Error('countryCode is required');
	}

	return Array.from(countryCodeToCountry(countryCode)).map(letterToLetterEmoji).join('');
}
