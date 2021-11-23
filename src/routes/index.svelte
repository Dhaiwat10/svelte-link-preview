<script lang="ts">
	import { LinkPreview } from '$lib';

	async function fetcher(url: string) {
		const proxyUrl = 'https://rlp-proxy.herokuapp.com/v2';
		console.log('using this fetcher!');
		const data = await fetch(`${proxyUrl}?url=${url}`)
			.then((res) => res.json())
			.then((r) => r.metadata);
		return data;
	}
</script>

<LinkPreview url="https://youtube.com" width="400px" height="600px" {fetcher} />
<LinkPreview url="https://barcauniversal.com" />
