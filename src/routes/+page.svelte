<script lang="ts">
	import { Tooltip, Button, Heading, P, Label, Textarea, List, Li, A } from 'flowbite-svelte';
	import { flip } from 'svelte/animate';
	import { fade, slide } from 'svelte/transition';
	import SvelteSeo from 'svelte-seo';

	import { copyAll, copyLink } from '$lib/clipboard';
	import PhoneNumber from '$lib/components/PhoneNumber.svelte';
	import { addField, removeField } from '$lib/fields';
	import { formatLink } from '$lib/format';
	import { phoneNumbers } from '../stores/phoneNumber';

	let message = '';
	$: numOfPhone = $phoneNumbers.length > 1 ? $phoneNumbers.length : 1;
	$: showResult = $phoneNumbers.filter((num) => num.valid && num.value !== '').length > 0;
</script>

<svelte:head>
	<title>WhatsApp Link Generator | tfkhdyt</title>
</svelte:head>

<SvelteSeo
	title="WhatsApp Link Generator | tfkhdyt"
	description="Free and Open Source WhatsApp Link Generator"
/>

<Heading tag="h3" class="mb-6">WhatsApp Link Generator</Heading>
<Label defaultClass="mb-2 font-bold block">WhatsApp Numbers:</Label>
{#each $phoneNumbers as _, index ($phoneNumbers[index].id)}
	<div class="flex mr-2 mb-2 space-x-2 w-full" transition:slide|local>
		<PhoneNumber bind:value={$phoneNumbers[index].value} bind:valid={$phoneNumbers[index].valid} />

		{#if numOfPhone > 1}
			<Button color="alternative" on:click={() => removeField($phoneNumbers[index].id)}>
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
	</div>
{/each}

<Button color="alternative" class="mb-6" on:click={addField}>
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
</Button>

<Label for="message" defaultClass="mb-2 font-bold block">Message:</Label>
<Textarea
	id="message"
	rows="4"
	name="message"
	bind:value={message}
	placeholder="Assalamu'alaikum Wr. Wb."
	class="w-full"
/>

{#if showResult}
	<P class="mt-6" weight="bold">Result:</P>
	<List tag="ol" list="decimal">
		{#each $phoneNumbers.filter((num) => num.valid && num.value !== '') as number (number.id)}
			<span transition:fade animate:flip>
				<Li class="mb-2">
					<A href={formatLink(number, message)} target="_blank" class="mr-2 font-medium">
						wa.me/{number.value.replace('+', '')}
					</A>
					<Button
						id="click{number.id}"
						outline
						pill={true}
						size="xs"
						on:click={() => copyLink(number, message)}
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
				</Li>
			</span>
		{/each}
	</List>

	<Button id="copyAll" outline pill={true} size="xs" on:click={() => copyAll(message)}>
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
				d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
			/>
		</svg>
		Copy All</Button
	>
	<Tooltip trigger="click" triggeredBy="#copyAll">Copied</Tooltip>
{/if}

<P align="center" weight="light" class="mt-6">
	Created by <A class="font-semibold" href="https://tfkhdyt.my.id" target="_blank">tfkhdyt</A> |
	<A class="font-semibold" href="https://github.com/tfkhdyt/whatsapp-link-generator" target="_blank"
		>Source Code</A
	>
</P>
