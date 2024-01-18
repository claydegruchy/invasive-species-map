<script>
  import "../app.css";

  import { onMount } from "svelte";
  import { randomStyle } from "$lib/mapStyles";

  import data from "$lib/data.json";

  import Map from "../components/Map.svelte";
  import GBIFLayer from "../components/GBIFLayer.svelte";

  let datasets = data.map((d) => {
    return {
      countryCode: d.hosting_country,
      style: randomStyle(),
      datasetKey: d.dataset_key,
    };
  });

  //   [
  //     {
  //       countryCode: "DK",
  //       style: randomStyle(),
  //       datasetKey: "4d1bd299-2435-47e2-8fe1-ac949394a40d",
  //     },
  //     {
  //       countryCode: "SI",
  //       style: randomStyle(),
  //       datasetKey: "ebf3c079-f88e-4b85-bcc5-f568229e68f3",
  //     },
  //     {
  //       countryCode: "RU",
  //       style: randomStyle(),
  //       datasetKey: "af5f680a-e0cc-46c8-b623-ceeaab70aa9e",
  //     },
  //   ];

  onMount(() => {});
  //   here we get the list of datasets
</script>

<body>
  <h1>Map</h1>

  <Map>
    {#each datasets as { datasetKey, style, countryCode }, i}
      <!-- {#each [datasets[3]] as { datasetKey, style, countryCode }, i} -->
      <GBIFLayer {datasetKey} {style} {countryCode} />
    {/each}
    <!-- <GBIFLayer
      style="classic-noborder.poly"
      country="DK"
      datasetKey="4d1bd299-2435-47e2-8fe1-ac949394a40d"
    /> -->
  </Map>
</body>
