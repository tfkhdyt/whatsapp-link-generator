<script lang="ts">
	import { Heading, P, Label, Textarea, A } from 'flowbite-svelte';
	import SvelteSeo from 'svelte-seo';

	import AddFieldButton from '$lib/components/Buttons/AddFieldButton.svelte';
	import PhoneNumber from '$lib/components/PhoneNumber.svelte';
	import { phoneNumbers } from '../stores/phoneNumber';
	import Result from '$lib/components/Result.svelte';

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
	<PhoneNumber
		bind:value={$phoneNumbers[index].value}
		bind:valid={$phoneNumbers[index].valid}
		{numOfPhone}
		id={$phoneNumbers[index].id}
	/>
{/each}

<AddFieldButton />

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
	<Result {message} />
{/if}

<P align="center" weight="light" class="mt-6">
	Created by <A class="font-semibold" href="https://tfkhdyt.my.id" target="_blank">tfkhdyt</A> |
	<A class="font-semibold" href="https://github.com/tfkhdyt/whatsapp-link-generator" target="_blank"
		>Source Code</A
	>
</P>
