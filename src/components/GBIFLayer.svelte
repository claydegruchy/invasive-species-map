<script>
  import { onMount, getContext } from "svelte";
  import { GetCountry } from "$lib/getCountry";
  import { randomStyle } from "$lib/mapStyles";

  //   get geojson of each country

  const { getMap } = getContext("sharedState");
  const map = getMap();

  export let datasetKey; //"4d1bd299-2435-47e2-8fe1-ac949394a40d"
  export let style = randomStyle();
  export let countryCode;

  onMount(async () => {
    console.log("onMount layer", style, countryCode);
    L = (await import("leaflet")).default;
    let B = (await import("leaflet-boundary-canvas")).default;

    // url generation
    const baseUrl = new URL(
      "https://api.gbif.org/v2/map/occurrence/density/{z}/{x}/{y}@1x.png?srs=EPSG%3A3857"
    );
    const urlParams = new URLSearchParams(baseUrl.search);
    const args = [
      ["style", style],
      //   ["bin", "hex"],
      // ["hexPerTile", "17"],
      //   ["year", "2000,2017"],
      ["datasetKey", datasetKey],
      ["country", countryCode],
    ];

    args.forEach(([key, value]) => {
      if (value) urlParams.append(key, value);
    });

    baseUrl.search = urlParams.toString();
    let url = decodeURI(baseUrl.toString());

    var gbifUrl = url;
    var gbifAttrib = '<a href="https://www.gbif.org">GBIF</a>';

    var gbifOverlay = new L.TileLayer(gbifUrl, {
      minZoom: 1,
      maxZoom: 15,
      zoomOffset: -1,
      tileSize: 512,
      attribution: gbifAttrib,
    });

    // poly selection
    let countryPoly = await GetCountry(countryCode);

    // add the country overlay
    var countryOverlay = L.geoJSON(countryPoly, {
      style: {
        radius: 1,
        fillColor: "#ff7800",
        weight: 1,
        // opacity: 0.1,
        fillOpacity: 0.0,
      },
    });
    map.addLayer(countryOverlay);
    map.addLayer(gbifOverlay);
  });
</script>
