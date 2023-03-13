<script lang="ts">
	import TelInput, { normalizedCountries } from 'svelte-tel-input';
	import type { CountryCode, E164Number } from 'svelte-tel-input/types';
	import countryCodeToFlagEmoji from 'country-code-to-flag-emoji';
	import { Select } from 'flowbite-svelte';

	// You must use E164 number format. It's guarantee the parsing and storing consistency.
	export let value: E164Number = '';

	export let valid = true;

	let selectedCountry: CountryCode = 'ID';
</script>

<Select
	class="w-2/6 md:w-2/6"
	items={normalizedCountries.map((country) => ({
		value: country.iso2,
		name: `${countryCodeToFlagEmoji(country.iso2)}
				(+${country.dialCode}) ${country.name.split(' (')[0]}`
	}))}
	bind:value={selectedCountry}
/>
<TelInput
	bind:country={selectedCountry}
	bind:value
	bind:valid
	class="block p-2.5 w-4/6 md:w-4/6 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:placeholder-gray-400 dark:text-white dark:bg-gray-700 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 text-sm dark:focus:ring-blue-500 dark:focus:border-blue-500 {!valid &&
		'bg-red-50 border-red-500 text-red-900 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'}"
/>
