<template>
  <div class="container">
    <div>
      <!-- <Logo /> -->
      <h1 class="title">
        Puncome
      </h1>

      <div>
        <textarea v-model="input" name="input" id="input" class="border" cols="50" rows="10"></textarea>
      </div>

      <div class="my-2">
        <button @click="check" id="check" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Check</button>
      </div>

      <div>
        <textarea v-model="output" name="output" id="output" class="border" cols="50" rows="10"></textarea>
      </div>

      <div class="links">
        <a
          href="https://github.com/narze/puncome"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      input: "",
      output: "",
    }
  },
  methods: {
    async check() {
      const result = await this.$axios.$get(`/api/wordcut?input=${this.input}`)
      this.output = result.output
      console.log(this.output)
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
