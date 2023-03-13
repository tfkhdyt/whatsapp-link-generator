<script lang="ts">
	import { Tooltip, Button } from 'flowbite-svelte';
	import PhoneNumber from '../lib/components/PhoneNumber.svelte';
	import { idIncrement, phoneNumbers } from '../stores/phoneNumber';

	let message = '';
	$: numOfPhone = $phoneNumbers.length > 1 ? $phoneNumbers.length : 1;
	$: showResult = $phoneNumbers.filter((num) => num.valid && num.value !== '').length > 0;

	function addField() {
		$phoneNumbers = [...$phoneNumbers, { id: $idIncrement, value: '', valid: true }];
		$idIncrement++;
	}

	function removeField(id: number) {
		$phoneNumbers = $phoneNumbers.filter((num) => num.id !== id);
	}
</script>

<main>
	<h1 class="mb-6 text-3xl font-bold">WhatsApp Link Generator</h1>
	<p class="mb-2 font-bold">WhatsApp Numbers</p>
	{#each $phoneNumbers as _, index ($phoneNumbers[index].id)}
		<div class="flex">
			<PhoneNumber
				bind:value={$phoneNumbers[index].value}
				bind:valid={$phoneNumbers[index].valid}
			/>

			{#if numOfPhone > 1}
				<button
					type="button"
					class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600 hover:text-blue-700 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-200 focus:outline-none dark:focus:ring-gray-700 dark:hover:text-white dark:hover:bg-gray-700"
					on:click={() => removeField($phoneNumbers[index].id)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
						/>
					</svg>
				</button>
			{/if}
		</div>
	{/each}

	<button
		type="button"
		class="flex py-2.5 px-5 mr-2 mb-6 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600 hover:text-blue-700 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-200 focus:outline-none dark:focus:ring-gray-700 dark:hover:text-white dark:hover:bg-gray-700"
		on:click={addField}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="mr-2 w-5 h-5"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
		</svg>
		Add number
	</button>

	<label for="message" class="block mb-2 font-bold text-gray-900 dark:text-white text-md"
		>Message</label
	>
	<textarea
		id="message"
		rows="4"
		class="block p-2.5 mb-6 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 lg:w-3/6 dark:placeholder-gray-400 dark:text-white dark:bg-gray-700 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 text-md dark:focus:ring-blue-500 dark:focus:border-blue-500"
		placeholder="Assalamu'alaikum Wr. Wb."
		bind:value={message}
	/>

	{#if showResult}
		<p class="mb-2 font-bold">Result</p>
		<ul class="space-y-1 max-w-md list-disc list-inside text-gray-500 dark:text-gray-400">
			{#each $phoneNumbers.filter((num) => num.valid && num.value !== '') as number}
				<li>
					<a
						href="https://wa.me/{number.value.replace('+', '')}?text={encodeURI(message)}"
						target="_blank"
						class="mr-2 font-medium text-blue-600 dark:text-blue-500 hover:underline"
					>
						wa.me/{number.value.replace('+', '')}
					</a>
					<Button
						id="click{number.id}"
						outline
						pill={true}
						size="xs"
						on:click={async () =>
							await navigator.clipboard.writeText(
								`https://wa.me/${number.value.replace('+', '')}?text=${encodeURI(message)}`
							)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="mr-1 w-4 h-4"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
							/>
						</svg>
						Copy link</Button
					>
					<Tooltip trigger="click" triggeredBy="#click{number.id}">Copied</Tooltip>
				</li>
			{/each}
		</ul>
	{/if}
</main>
