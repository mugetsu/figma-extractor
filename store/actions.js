export default {
  async getFigmaData({ state, commit }, payload) {
    await this.$axios
      .get("https://api.figma.com/v1/files/" + figmaId, {
        headers: {
          'X-Figma-Token': process.env.FIGMA_KEY
        }
      })
      .then(res => {
        if (res.status === 200) {
          // const figmaTreeStructure = res.data
          // const stylesArtboard = figmaTreeStructure.document.children.filter(item => {
          //     return item.name === 'styles'
          // })[0].children
          // console.log(stylesArtboard)
          commit('SET_DATA', res.data)
        }
      })
      .catch(err => {
        console.log('API error.', err)
      })
  }
}
