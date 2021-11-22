<template>
  <div class="ml-5 mt-5">
    <h1>Hello world</h1>
    <button
      class="btn btn-primary"
      @click="myMethod"
    >
      My button
    </button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import { Socket } from 'vue-socket.io-extended'
import MainModule from '@/store/modules/'

interface Message {
  text: string
}

@Component
export default class App extends Vue {
  public doSmth() {
    const MainModuleInstance = getModule(MainModule, this.$store)

    MainModuleInstance.newMessage()
  }

  @Socket()
  connect() {
    console.log('Connected to socket.io')
  }

  @Socket('createMessage')
  onCreateMessage({ text }: Message) {
    console.log(text)
  }

  @Emit()
  myMethod() {
    this.doSmth()
  }
}
</script>
