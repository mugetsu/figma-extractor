export default {
  async getFigmaData({ commit }, figmaId) {
    console.log(`${process.env.apiUrl}/${figmaId}`)
    await this.$axios
      .get(`${process.env.apiUrl}/${figmaId}`, {
        headers: {
          'X-Figma-Token': process.env.figmaKey
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
