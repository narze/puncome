<template>
  <div class="container">
    <div>
      <!-- <Logo /> -->
      <h1 class="title">
        พันคำ
      </h1>

      <div>
        <textarea v-model="input" name="input" id="input" class="border p-4" cols="50" rows="10"></textarea>
      </div>

      <div class="my-2">
        <button @click="check" id="check" class="btn-blue">ตรวจสอบ</button>
      </div>

      <div id="result">{{ resultMessage }}</div>
      <div id="uncommonWords">{{ uncommonWords }}</div>

      <div class="links">
        <a
          href="https://github.com/narze/puncome"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-blue"
        >
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import words from "@/data/tnc-1k-wordlist"

export default Vue.extend({
  data() {
    return {
      input: [
        "คุณสามารถอธิบายเรื่องยากด้วยคำที่ง่ายลงได้หรือไม่",
        "โดยเราจะตรวจสอบประโยคว่าใช้เพียงหนึ่งพันคำที่ใช้บ่อยที่สุดหรือเปล่า"
      ].join(" "),
      commonWords: words,
      resultMessage: "",
      uncommonWords: "",
    }
  },
  methods: {
    async check() {
      const host = window.location.origin
      const result = await this.$axios.$get(`${host}/api/wordcut?input=${this.input}`)
      const words: string[] = result.output.split("|")

      const commonWordsSet = new Set(this.commonWords)

      let uncommonWords: string[] = []

      words.forEach(word => {
        if (word == " ") return

        if (!commonWordsSet.has(word)) {
          uncommonWords.push(word)
        }
      });

      if (uncommonWords.length) {
        this.resultMessage = "เอ ยังมีคำที่ใช้ยากอยู่นะ ลองใช้คำที่ง่ายลงอีกหน่อยสิ"
        this.uncommonWords = `(${uncommonWords.join(", ")})`
      } else {
        this.resultMessage = "ดีมาก! คุณใช้แค่หนึ่งพันคำที่ใช้บ่อยที่สุด"
        this.uncommonWords = ""
      }
    }
  }
})
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.btn-blue {
  @apply bg-blue-500 text-white font-bold py-2 px-4 rounded;
}

.btn-blue:hover {
  @apply bg-blue-700;
}

.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
