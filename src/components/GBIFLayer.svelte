<script>
  import { onMount, getContext } from "svelte";
  import { GetCountry } from "$lib/getCountry";
  // import "leaflet-boundary-canvas";

  //   get geojson of each country

  const { getMap } = getContext("sharedState");
  const map = getMap();

  export let datasetKey; //"4d1bd299-2435-47e2-8fe1-ac949394a40d"
  export let style = "classic.point";
  export let countryCode;

  onMount(async () => {
    console.log(await GetCountry(countryCode));
    console.log("onMount layer");
    L = (await import("leaflet")).default;

    // url generation
    const baseUrl = new URL(
      "https://api.gbif.org/v2/map/occurrence/density/{z}/{x}/{y}@1x.png?style=classic.point&srs=EPSG%3A3857"
    );
    const urlParams = new URLSearchParams(baseUrl.search);
    const args = [
      ["style", style],
      //   ["bin", "hex"],
      // ["hexPerTile", "17"],
      //   ["year", "2000,2017"],
      ["datasetKey", datasetKey],
    ];

    args.forEach(([key, value]) => {
      if (value) urlParams.append(key, value);
    });
    // urlParams.set("style", "green.point");
    // https://api.gbif.org/v2/map/occurrence/density/1/0/1@2x.png?srs=EPSG:4326&style=blue.marker&publishingOrg=7b8aff00-a9f8-11d8-944b-b8a03c50a862&bin=hex&hexPerTile=41&year=2000,2017

    baseUrl.search = urlParams.toString();
    let url = decodeURI(baseUrl.toString());
    console.log(url);
    // https://tile.gbif.org/4326/omt/{z}/{x}/{y}@2x.png?style=gbif-classic
    // ../../../map/occurrence/density/{z}/{x}/{y}.mvt?srs=EPSG:4326&bin=hex&hexPerTile=17
    // add the GBIF occurrence overlay
    var gbifUrl = url;
    var gbifAttrib = '<a href="https://www.gbif.org">GBIF</a>';

    var gbifOverlay = L.tileLayer(gbifUrl, {
      minZoom: 1,
      maxZoom: 15,
      zoomOffset: -1,
      tileSize: 512,
      attribution: gbifAttrib,
    });

    

    map.addLayer(gbifOverlay);
  });
</script>
