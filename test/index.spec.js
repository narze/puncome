import { mount } from '@vue/test-utils'
import Index from '@/pages/index.vue'

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

  test("cuts words", () => {
    const wrapper = mount(Index)
    const textArea = wrapper.find("textarea#input")
    expect(textArea.exists()).toBe(true)

    textArea.setValue("ไก่จิกเด็กตายบนปากโอ่ง")
    expect(textArea.element.value).toBe("ไก่จิกเด็กตายบนปากโอ่ง")

    const button = wrapper.get("button#check")
    button.trigger("click")

    const output = wrapper.get("textarea#output")
    expect(output.element.value).toBe("ไก่ จิก เด็ก ตาย บน ปาก โอ่ง")
  })
})
