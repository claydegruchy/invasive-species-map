<script>
  import "../app.css";

  import { onMount } from "svelte";

  //   import { features } from "$lib/countries.json";
  import geoJson from "world-geojson";

  import Map from "../components/Map.svelte";
  import GBIFLayer from "../components/GBIFLayer.svelte";

  let datasets = [
    {
      countryCode: "AU",
      style: "classic-noborder.poly",
      datasetKey: "4d1bd299-2435-47e2-8fe1-ac949394a40d",
    },
    {
      countryCode: "SI",
      style: "classic-noborder.poly",
      datasetKey: "ebf3c079-f88e-4b85-bcc5-f568229e68f3",
    },
  ];

  onMount(() => {});
  //   here we get the list of datasets
</script>

<body>
  <h1>Map</h1>

  <Map>
    {#each datasets as { datasetKey, style, countryCode }, i}
      <GBIFLayer {datasetKey} {style} {countryCode} />
    {/each}
    <!-- <GBIFLayer
      style="classic-noborder.poly"
      country="DK"
      datasetKey="4d1bd299-2435-47e2-8fe1-ac949394a40d"
    /> -->
  </Map>
</body>
