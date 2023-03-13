<script lang="ts">
	import TelInput, { normalizedCountries } from 'svelte-tel-input';
	import type { NormalizedTelNumber, CountryCode, E164Number } from 'svelte-tel-input/types';

	// Any Country Code Alpha-2 (ISO 3166)
	let country: CountryCode | null = 'ID';

	// You must use E164 number format. It's guarantee the parsing and storing consistency.
	export let value: E164Number | null = '';

	// Validity
	let valid = true;

	// Optional - Extended details about the parsed phone number
	let parsedTelInput: NormalizedTelNumber | null = null;

	let selectedCountry = 'ID';
</script>

<div class="flex mr-2 mb-2 space-x-2">
	<select
		class="block p-2.5 w-2/6 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:placeholder-gray-400 dark:text-white dark:bg-gray-700 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 text-md dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
				{country.iso2} (+{country.dialCode})
			</option>
		{/each}
	</select>
	<TelInput
		bind:country
		bind:value
		bind:valid
		bind:parsedTelInput
		class="block p-2.5 w-4/6 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:placeholder-gray-400 dark:text-white dark:bg-gray-700 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 text-md dark:focus:ring-blue-500 dark:focus:border-blue-500"
	/>
</div>
