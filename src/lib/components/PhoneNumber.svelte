<script lang="ts">
	import TelInput, { normalizedCountries } from 'svelte-tel-input';
	import type { CountryCode, E164Number } from 'svelte-tel-input/types';
	import countryCodeToFlagEmoji from 'country-code-to-flag-emoji';

	// You must use E164 number format. It's guarantee the parsing and storing consistency.
	export let value: E164Number = '';

	export let valid = true;

	let selectedCountry: CountryCode = 'ID';
</script>

<div class="flex mr-2 mb-2 space-x-2">
	<select
		class="block p-2.5 w-5/12 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 md:w-2/6 dark:placeholder-gray-400 dark:text-white dark:bg-gray-700 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 text-md dark:focus:ring-blue-500 dark:focus:border-blue-500"
		aria-label="Default select example"
		name="Country"
		bind:value={selectedCountry}
	>
		<option value={null} hidden={selectedCountry !== null}>Please select</option>
		{#each normalizedCountries as country (country.id)}
			<option
				value={country.iso2}
				selected={country.iso2 === selectedCountry}
				aria-selected={country.iso2 === selectedCountry}
			>
				{countryCodeToFlagEmoji(country.iso2)}
				(+{country.dialCode}) {country.name.split(' (')[0]}
			</option>
		{/each}
	</select>
	<TelInput
		bind:country={selectedCountry}
		bind:value
		bind:valid
		class="block p-2.5 w-7/12 md:w-4/6 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:placeholder-gray-400 dark:text-white dark:bg-gray-700 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 text-md dark:focus:ring-blue-500 dark:focus:border-blue-500 {!valid &&
			'bg-red-50 border-red-500 text-red-900 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'}"
	/>
</div>
