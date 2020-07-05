import { mount } from '@vue/test-utils'
import Index from '@/pages/index.vue'
import flushPromises from 'flush-promises'

describe('Index', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Index, {
      stubs: ["Logo"]
    })
    expect(wrapper.vm).toBeTruthy()
  })

  test('renders title', () => {
    const wrapper = mount(Index, {
      stubs: ["Logo"]
    })

    expect(wrapper.html()).toContain("Puncome")
  })

  test("cuts words then scan with wordlist", async () => {
    const $axios = { $get: () => Promise.resolve({ output: 'ไก่|จิก|เด็ก|ตาย|บน|ปาก|โอ่ง' }) }
    const wrapper = mount(Index, {
      mocks: { $axios }
    })
    wrapper.setData({ commonWords: ["ไก่", "จิก", "เด็ก", "ปาก"] })

    const textArea = wrapper.find("textarea#input")
    expect(textArea.exists()).toBe(true)

    textArea.setValue("ไก่จิกเด็กตายบนปากโอ่ง")
    expect(textArea.element.value).toBe("ไก่จิกเด็กตายบนปากโอ่ง")

    const button = wrapper.get("button#check")
    button.trigger("click")

    await flushPromises()

    const output = wrapper.get("textarea#output")
    expect(output.element.value).toBe("ตาย บน โอ่ง")
  })
})
