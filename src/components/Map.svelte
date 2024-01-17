<script>
  import { onDestroy, onMount, setContext } from "svelte";

  import "leaflet/dist/leaflet.css";

  setContext("sharedState", {
    getL: async () => {
      return L;
    },
    getMap: () => {
      return map;
    },
  });

  let refElement = null;
  let map = null;
  let L = null;

  onMount(async () => {
    console.log("onMount");
    L = (await import("leaflet")).default;

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

    map.setView(new L.LatLng(59.3293, 18.0686), 4);
    map.addLayer(osm);

    // on destroy
    return () => ({
      destroy() {
        console.log("destroy");
        map.remove();
        refElement = null;
      },
    });
  });

  onDestroy(() => {
    console.log("destroy");
    if (map) map.remove();
  });
</script>

<div class="map" bind:this={refElement}>
  {#if map && L}
    <slot />
  {/if}
</div>
