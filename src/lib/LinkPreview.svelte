<script lang="ts">
	import './LinkPreview.css';

	interface APIResponse {
		title: string | null;
		description: string | null;
		image: string | null;
		siteName: string | null;
		hostname: string | null;
	}

	export let url: string = 'https://youtube.com';
	export let width: string | number = null;
	export let height: string | number = null;
	export let className: string = '';
	export let imageHeight: string | number = null;
	export let textAlign: string = null;
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
