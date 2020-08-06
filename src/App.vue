<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'App',
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: 'Accomodation Request',
    // all titles will be injected into this template
    titleTemplate: '%s | BenZee Residency Booking',
    meta: [
      { charset: 'utf-8' },
      { name:'description', content: 'BenZee Residency is about 20 min drive from the International Airport and 10-15 mins from two shopping malls. Within 3 mins walk away from the hostel, taxis are available, with the occasional buses(trotro) passing by.'},
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  }
}
</script>
