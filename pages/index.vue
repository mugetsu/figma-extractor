<template>
  <div>
    <Extractor />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Extractor from '~/components/Extractor'

export default {
  components: {
    Extractor
  },
  computed: {
    ...mapGetters([
      'data'
    ])
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
</style>