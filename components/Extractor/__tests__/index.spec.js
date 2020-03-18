import { shallowMount } from '@vue/test-utils'
import Extractor from '../index.vue'

const factory = () => {
  return shallowMount(Extractor, {})
}

describe('Extractor', () => {
  test('mounts properly', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('renders properly', () => {
    const wrapper = factory()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
