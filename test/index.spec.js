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

    expect(wrapper.html()).toContain("พันคำ")
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

    const result = wrapper.get("#result")
    expect(result.text()).toContain("เอ ยังมีคำที่ใช้ยากอยู่นะ ลองใช้คำที่ง่ายลงอีกหน่อยสิ")

    const uncommonWords = wrapper.get("#uncommonWords")
    expect(uncommonWords.text()).toContain("(ตาย, บน, โอ่ง)")
  })

  test("when all words are common", async () => {
    const $axios = { $get: () => Promise.resolve({ output: 'ไก่|จิก|เด็ก|ตาย|บน|ปาก|โอ่ง' }) }
    const wrapper = mount(Index, {
      mocks: { $axios }
    })
    wrapper.setData({ commonWords: ["ไก่", "จิก", "เด็ก", "ตาย", "บน", "ปาก", "โอ่ง"] })

    const textArea = wrapper.get("textarea#input")
    textArea.setValue("ไก่จิกเด็กตายบนปากโอ่ง")

    const button = wrapper.get("button#check")
    button.trigger("click")

    await flushPromises()

    const result = wrapper.get("#result")
    expect(result.text()).toContain("ดีมาก! คุณใช้แค่หนึ่งพันคำที่ใช้บ่อยที่สุด")

    const uncommonWords = wrapper.get("#uncommonWords")
    expect(uncommonWords.text()).toBe("")
  })
})
