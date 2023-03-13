<script lang="ts">
	import { removeField } from '$lib/fields';
	import { Button } from 'flowbite-svelte';
	import TelInput, { normalizedCountries } from 'svelte-tel-input';
	import type { CountryCode, E164Number } from 'svelte-tel-input/types';

	// You must use E164 number format. It's guarantee the parsing and storing consistency.
	export let value: E164Number = '';

	export let valid = true;

	let selectedCountry: CountryCode = 'ID';

	export let numOfPhone = 1;
	export let id: number;

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
	function countryCodeToFlagEmoji(countryCode: string): string {
		if (!countryCode) {
			throw new Error('countryCode is required');
		}

		return Array.from(countryCodeToCountry(countryCode)).map(letterToLetterEmoji).join('');
	}
</script>

<select
	class="block p-2.5 w-2/6 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:placeholder-gray-400 dark:text-white dark:bg-gray-700 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
	name="Country"
	bind:value={selectedCountry}
>
	<option value={null} hidden={selectedCountry !== null}>Please select</option>
	{#each normalizedCountries.filter((country) => country.dialCode !== '972') as country (country.id)}
		<option
			value={country.iso2}
			selected={country.iso2 === selectedCountry}
			aria-selected={country.iso2 === selectedCountry}
		>
			{countryCodeToFlagEmoji(country.iso2)}
			(+{country.dialCode}) {country.name}
		</option>
	{/each}
</select>

<TelInput
	bind:country={selectedCountry}
	bind:value
	bind:valid
	class="block p-2.5 w-4/6 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:placeholder-gray-400 dark:text-white dark:bg-gray-700 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 text-sm dark:focus:ring-blue-500 dark:focus:border-blue-500 {!valid &&
		'bg-red-50 border-red-500 text-red-900 focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'}"
	placeholder="Example: 8953xxxxxxxx"
/>

{#if numOfPhone > 1}
	<Button color="alternative" on:click={() => removeField(id)}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-5 h-5"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
			/>
		</svg>
	</Button>
{/if}
