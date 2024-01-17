<script>
  import { onMount, setContext } from "svelte";

  import "leaflet/dist/leaflet.css";

  setContext("sharedState", {});

  let refElement = null;
  let map = null;

  onMount(async () => {
    console.log("onMount");
    const L = (await import("leaflet")).default;

    // set up the map
    map = L.map(refElement, { preferCanvas: true });

    // create the base tile layer with correct attribution
    var osmUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    var osmAttrib =
      'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
    var osm = new L.TileLayer(osmUrl, {
      minZoom: 1,
      maxZoom: 15,
      attribution: osmAttrib,
    });

    map.setView(new L.LatLng(-20, -50), 3);
    map.addLayer(osm);

    // url generation
    const baseUrl = new URL(
      "https://api.gbif.org/v2/map/occurrence/density/{z}/{x}/{y}@1x.png?style=classic.point&srs=EPSG%3A3857"
    );
    const urlParams = new URLSearchParams(baseUrl.search);
    baseUrl.search = urlParams.toString();
    let url = decodeURI(baseUrl.toString());

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

    // on destroy
    return () => ({
      destroy() {
        console.log("destroy");
        map.remove();
        refElement = null;
      },
    });
  });
</script>

<div class="map" bind:this={refElement}>
  {#if map}
    <slot />
  {/if}
</div>
