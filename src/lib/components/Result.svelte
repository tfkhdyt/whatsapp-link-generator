<script lang="ts">
	import { A, Li, List, P } from 'flowbite-svelte';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';

	import CopyLinkButton from './Buttons/CopyLinkButton.svelte';
	import { formatLink } from '$lib/format';
	import { phoneNumbers } from '../../stores/phoneNumber';
	import CopyAllButton from './Buttons/CopyAllButton.svelte';

	export let message: string;
	$: validNumber = $phoneNumbers.filter((num) => num.valid && num.value !== '');
</script>

<P class="mt-6" weight="bold">Result:</P>
<List tag="ol" list="decimal">
	{#each validNumber as number (number.id)}
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

{#if validNumber.length > 1}
	<CopyAllButton {message} />
{/if}
