<script lang="ts">
	import './LinkPreview.css';

	interface APIResponse {
		title: string | null;
		description: string | null;
		image: string | null;
		siteName: string | null;
		hostname: string | null;
	}

	/**
	 * The url for which the preview is to be rendered.
	 */
	export let url: string;

	/**
	 * The width of the preview card.
	 */
	export let width: string | number = null;

	/**
	 * The height of the preview card.
	 */
	export let height: string | number = null;

	/**
	 * The class you want to apply to the preview card container.
	 */
	export let className: string = '';

	/**
	 * The image's height.
	 */
	export let imageHeight: string | number = null;

	/**
	 * The alignment of the text inside the card.
	 */
	export let textAlign: string = null;

	/**
	 * A custom fetcher function that fetches and provides the metadata for urls from a source of your choice.
	 */
	export let fetcher: (url: string) => Promise<APIResponse | null> = null;

	async function getMetadata(url: string): Promise<APIResponse> {
		const data = await fetch(`${proxyUrl}?url=${url}`)
			.then((res) => res.json())
			.then((r) => r.metadata);
		return data;
	}

	function clickHandler(e: MouseEvent) {
		window.open(url, '_blank');
	}

	const proxyUrl = 'https://rlp-proxy.herokuapp.com/v2';
	const placeholderImg = 'https://i.imgur.com/UeDNBNQ.jpeg';

	$: metadata = fetcher ? fetcher(url) : getMetadata(url);
</script>

<div
	class={`Container ${className}`}
	on:click={clickHandler}
	style={`width:${width};height:${height};textAlign:${textAlign}`}
>
	{#await metadata then data}
		<div
			class="Image"
			style={`background-image:url(${data.image || placeholderImg});height:${imageHeight}`}
		/>
		<!-- <img class="image" src={data.image} alt="Barca Universal" /> -->
		<div class="LowerContainer">
			<h3 class="Title">{data.title}</h3>
			<span class="Description Secondary">{data.description}</span>
			<div class="Secondary SiteDetails">
				{#if data.siteName}
					<span>{data.siteName} • </span>
				{/if}
				<span>{data.hostname}</span>
			</div>
		</div>
	{/await}
</div>
