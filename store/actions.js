export default {
  async getFigmaData({ commit }, figmaId) {
    await this.$axios
      .get(`${process.env.apiUrl}/${figmaId}`, {
        headers: {
          'X-Figma-Token': process.env.figmaKey
        }
      })
      .then(res => {
        if (res.status === 200) {
          commit('SET_DATA', res.data)
        }
      })
      .catch(err => {
        console.log('API error.', err)
      })
  }
}
