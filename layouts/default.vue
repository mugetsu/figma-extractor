<template>
  <div class="wrapper">
    <Header />
    <div class="main-content">
      <nuxt />
    </div>
    <Footer />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Header from '~/components/Header'
import Footer from '~/components/Footer'

export default {
  components: {
    Header,
    Footer
  },
  head () {
    return {
      title: 'COVID-19 Tracker',
      meta: [
        { hid: 'og:description', name: 'og:description', content: 'tracks COVID-19 around the world.' },
        { hid: 'description', name: 'description', content: 'tracks COVID-19 around the world.' }
      ]
    }
  }
}
</script>

<style lang="scss">
// $color1: #fee140;
// $color2: #fa709a;
// $color3: #66a6ff;
// $color4: #89f7fe;
// $color5: #d1fdff;
// $color6: #fddb92;

html {
  display: flex;
  font-size: 62.5%;
}

body {
  margin: 0;
  width: 100%;
  font-family: 'Fredoka One', cursive;
  font-size: 14px;
  font-weight: 400;
  color: #000000;
  letter-spacing: 0.1rem;
  // background: linear-gradient(-75deg, $color1, $color2, $color3, $color4, $color5, $color6);
  // background-size: 800%;
  // animation: grad cubic-bezier(0.785, 0.135, 0.15, 0.86) 15s infinite;
}

p {
  margin: 0;
}

.wrapper {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.main-content {}

// @keyframes grad {
//   0% {
//     background-position: 0% 50%;
//   }
//   50% {
//     background-position: 100% 50%;
//   }
//   100% {
//     background-position: 0% 50%;
//   }
// }
</style>
