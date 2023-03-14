<script lang="ts">
	import { A, Button, Li, List, P, Tooltip } from 'flowbite-svelte';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';

	import CopyLinkButton from './Buttons/CopyLinkButton.svelte';
	import { copyAll } from '$lib/clipboard';
	import { formatLink } from '$lib/format';
	import { phoneNumbers } from '../../stores/phoneNumber';

	export let message: string;
</script>

<P class="mt-6" weight="bold">Result:</P>
<List tag="ol" list="decimal">
	{#each $phoneNumbers.filter((num) => num.valid && num.value !== '') as number (number.id)}
		<span transition:fade animate:flip>
			<Li class="mb-2">
				<A href={formatLink(number, message)} target="_blank" class="mr-2 font-medium">
					wa.me/{number.value.replace('+', '')}
				</A>
				<CopyLinkButton id="click{number.id}" {number} {message} />
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
