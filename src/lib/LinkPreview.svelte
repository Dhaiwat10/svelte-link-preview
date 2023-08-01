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
	 * The Proxy url you need to setup. See https://github.com/Rob--W/cors-anywhere
	*/
	export let proxyUrl: string;

	/**
	 * The width of the preview card.
	 */
	export let width: string | number | null = null;

	/**
	 * The height of the preview card.
	 */
	export let height: string | number | null = null;

	/**
	 * The class you want to apply to the preview card container.
	 */
	export let className: string = '';

	/**
	 * The image's height.
	 */
	export let imageHeight: string | number | null = null;

	/**
	 * The alignment of the text inside the card.
	 */
	export let textAlign: string | null = null;

	/**
	 * A custom fetcher function that fetches and provides the metadata for urls from a source of your choice.
	 */

	async function getMetadata(url: string): Promise<APIResponse> {
		const data = await fetch(`${proxyUrl}/${url}`, {
            headers: {
            "origin": document.URL,
            }
        })
			.then((res) => res.text())
			.then((html) => parseHtml(html));
		return data;
	}

    function parseHtml(html: string): APIResponse {
        let data: APIResponse = {
            title: "",
            description: "",
            image: "",
            siteName: "",
            hostname: "",
        }

        var el = document.createElement( 'html' );
		html = html.split("<head>")[1].split("</head>")[0]
        el.innerHTML = html;

		let test: HTMLMetaElement | null = el.querySelector('meta[property="og:title"]')
		data.title = test?.content ?? null;

		test = el.querySelector('meta[property="og:description"]')
		data.description = test?.content ?? null;

		test = el.querySelector('meta[property="og:image"]')
		data.image = test?.content ?? null;

		test = el.querySelector('meta[property="og:site_name"]')
		data.siteName = test?.content ?? null;

		test = el.querySelector('meta[property="og:url"]')
		data.hostname = test?.content ?? null;

        return data

    }

	function clickHandler(e: MouseEvent) {
		window.open(url, '_blank');
	}

	const placeholderImg = 'https://i.imgur.com/UeDNBNQ.jpeg';

	$: metadata = getMetadata(url);
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
			<h3 class="Title">{data.title || ''}</h3>
			<span class="Description Secondary">{data.description || ''}</span>
			<div class="Secondary SiteDetails">
				{#if data.siteName}
					<span>{data.siteName} • </span>
				{/if}
				<span>{data.hostname || ''}</span>
			</div>
		</div>
	{/await}
</div>