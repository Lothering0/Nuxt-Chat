<template>
  <form @submit.prevent>
    <input
      class="form-control"
      placeholder="Type message"
      type="text"
      v-model="text"
      @keydown.enter="sendMessage"
    >
    <button class="btn btn-primary" @click="sendMessage">Send</button>
  </form>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import MainModule from '@/store/modules/'

@Component
export default class ChatForm extends Vue {
  text: string = ''

  send(text: string) {
    const MainModuleInstance = getModule(MainModule, this.$store)

    MainModuleInstance.createMessage(text)
  }

  sendMessage() {
    this.send(this.text)
    this.text = ''
  }
}
</script>
