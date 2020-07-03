import { mount } from '@vue/test-utils'
import Index from '@/pages/index.vue'

describe('Index', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Index, {
      stubs: {
        Logo: true,
      }
    })
    expect(wrapper.vm).toBeTruthy()
  })
})
