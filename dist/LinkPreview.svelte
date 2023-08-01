<script>import "./LinkPreview.css";
export let url;
export let proxyUrl;
export let width = null;
export let height = null;
export let className = "";
export let imageHeight = null;
export let textAlign = null;
async function getMetadata(url2) {
  const data = await fetch(`${proxyUrl}/${url2}`, {
    headers: {
      "origin": document.URL
    }
  }).then((res) => res.text()).then((html) => parseHtml(html));
  return data;
}
function parseHtml(html) {
  let data = {
    title: "",
    description: "",
    image: "",
    siteName: "",
    hostname: ""
  };
  var el = document.createElement("html");
  html = html.split("<head>")[1].split("</head>")[0];
  el.innerHTML = html;
  let test = el.querySelector('meta[property="og:title"]');
  data.title = test?.content ?? null;
  test = el.querySelector('meta[property="og:description"]');
  data.description = test?.content ?? null;
  test = el.querySelector('meta[property="og:image"]');
  data.image = test?.content ?? null;
  test = el.querySelector('meta[property="og:site_name"]');
  data.siteName = test?.content ?? null;
  test = el.querySelector('meta[property="og:url"]');
  data.hostname = test?.content ?? null;
  return data;
}
function clickHandler(e) {
  window.open(url, "_blank");
}
const placeholderImg = "https://i.imgur.com/UeDNBNQ.jpeg";
$:
  metadata = getMetadata(url);
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