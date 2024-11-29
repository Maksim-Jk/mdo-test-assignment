<template>
  <div class="hello">
    <BaseButton>Click me</BaseButton>
    <BaseButton circle size="small">1</BaseButton>
    <BaseInput placeholder="Enter your name" size="large" v-model="value">
      <template #prefix>
        <span>👤</span>
      </template>
      <template #suffix>
        <button @click="handleSearch">🔍</button>
      </template>
    </BaseInput>
    <BaseSelect v-model="selectedOption" placeholder="Select an option" :options="options" size="large" />
    <BaseTextarea v-model="textareaValue" placeholder="Enter your message" size="large" />
 </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseButton from './BaseButton/BaseButton.vue'
import BaseInput from './BaseInput/BaseInput.vue'
import BaseSelect from './BaseSelect/BaseSelect.vue'
import BaseTextarea from './BaseTextarea/BaseTextarea.vue'
export default Vue.extend({
  name: 'HelloWorld',
  components: {
    BaseButton,
    BaseInput,
    BaseSelect,
    BaseTextarea
  },
  props: {
    msg: String
  },
  methods: {
    handleSearch () {
      console.log('search')
    }
  },
  data () {
    return {
      value: '',
      selectedOption: '',
      options: [{ value: '1', label: 'Option 1' }, { value: '2', label: 'Option 2' }],
      textareaValue: '',
      dateValue: ''
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello {
  max-width: 300px;
  margin: 0 auto;
}
</style>
