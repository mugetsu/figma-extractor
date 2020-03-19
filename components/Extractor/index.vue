<template>
  <div
    class="extractor"
    :class="{
      'is-submit': isSubmit,
      'is-done': isDone
    }">
    <div>
      <input
        v-model="figmaId"
        type="text"
        placeholder="Figma ID" />
      <button
        :disabled="isSubmit"
        @click="onClick">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
          width="30" height="30"
          viewBox="0 0 172 172"
          style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M97.46667,17.2c-11.07449,0 -29.50932,3.53108 -47.12083,17.15521l-3.34818,-3.34818c-3.12467,-3.12467 -8.18523,-3.12467 -11.3099,0l-4.68073,4.68073c-3.12467,3.12467 -3.12467,8.18523 0,11.3099l3.34818,3.34818c-13.62412,17.61152 -17.15521,36.04634 -17.15521,47.12083c0,18.47407 6.33802,31.23099 6.33802,31.23099c1.18954,2.37795 3.85779,3.62616 6.44553,3.01524c2.58774,-0.61092 4.41601,-2.92069 4.41645,-5.57957c0,0 -0.09376,-5.88642 3.93047,-16.61771c3.32353,-8.86275 9.53673,-20.67502 20.94011,-33.88489l72.24896,75.17161c5.17147,5.33773 13.80336,5.35082 19.21563,-0.06718c5.41227,-5.40653 5.40492,-14.0387 0.06718,-19.20443l-75.28359,-72.17057c13.25414,-11.46407 25.10967,-17.69699 33.99687,-21.02969c10.73129,-4.02423 16.61771,-3.93047 16.61771,-3.93047c2.65888,-0.00043 4.96864,-1.82871 5.57957,-4.41645c0.61092,-2.58774 -0.63729,-5.25599 -3.01524,-6.44553c0,0 -12.75692,-6.33802 -31.23099,-6.33802zM97.46667,28.66667c1.95889,0 2.90404,0.491 4.68073,0.62708c-11.84831,4.89246 -26.77127,13.35617 -43.13437,29.71927c-16.3631,16.3631 -24.82681,31.28607 -29.71927,43.13437c-0.13608,-1.77669 -0.62708,-2.72184 -0.62708,-4.68073c0,-10.04862 3.81879,-30.1115 21.25365,-47.54635c17.43485,-17.43485 37.49773,-21.25365 47.54635,-21.25365z"></path></g></g>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Extractor',
  computed: {
    ...mapGetters([
      'data'
    ])
  },
  data() {
    return {
      figmaId: '',
      isSubmit: false,
      isDone: false,
      downloadReady: null
    }
  },
  methods: {
    onClick() {
      if (!this.isDone) {
        this.isSubmit = true
        this.isDone = false
        this.$store
          .dispatch('getFigmaData', this.figmaId)
          .then(_ => {
            this.isSubmit = false
            this.isDone = true
            const { document, name, lastModified } = this.data
            const { children } = document
            const components = children.map(o => {
              return {
                name: o.name
              }
            })
            const formatDate = date => {
              const d = new Date(date)
              const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }) 
              const [{ value: mo },,{ value: da },,{ value: ye }] = dtf.formatToParts(d) 
              return `${da}-${mo}-${ye}`
            }
            const fileData = {
              name: name,
              components: components,
              lastModified: formatDate(lastModified)
            }
            this.downloadReady = this.download(JSON.stringify(fileData, null, 4), `components-${this.figmaId}.json`, 'application/json')
            this.$gtag('event', 'click', {
              event_category: 'extract',
              event_label: 'extract click',
              value: `components-${this.figmaId}.json`
            })
          })
      } else {
        this.isSubmit = false
        this.isDone = false
        this.figmaId = ''
      }
    },
    download(content, fileName, contentType) {
      let a = document.createElement('a')
      let file = new Blob([content], { type: contentType })
      a.href = URL.createObjectURL(file)
      a.download = fileName
      a.click()
      return a
    }
  }
}
</script>

<style lang="scss" scoped>
.extractor {

  &.is-submit {

    button {
      width: 100%;

      svg {
        animation: pick cubic-bezier(0.785, 0.135, 0.15, 0.86) 0.8s infinite;
      }
    }
  }

  &.is-done {

    button {
      width: 100%;
      background-color: #4ca64c;

      svg {
        animation: pick cubic-bezier(0.785, 0.135, 0.15, 0.86) 0.8s;
      }
    }
  }

  & > div {
    position: relative;
    width: 280px;
    height: 42px;
  }

  input {
    position: absolute;
    left: 0;
    display: block;
    border-radius: 32px;
    border: 1px solid #000000;
    margin: 0;
    padding: 0 64px 0 16px;
    width: calc(100% - 88px);
    height: 40px;
    font-size: 24px;
    outline: none;
  }

  button {
    position: absolute;
    right: -1px;
    display: block;
    border-radius: 32px;
    border: 0;
    margin: 0;
    padding: 4px 16px;
    width: 64px;
    height: 42px;
    background-color: #000000;
    cursor: pointer;
    outline: none;
    transition: 0.5s ease;
  }
}

@keyframes pick {
  0% {
    transform: rotate(40deg);
  }
  50% {
      transform: rotate(-15deg);
  }
  100% {
    transform: rotate(40deg);
  }
}
</style>
