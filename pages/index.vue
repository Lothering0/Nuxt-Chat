<template>
  <div>
    <h1>Hello world</h1>
    <button
      class="btn btn-primary"
      @click="myMethod"
    >
      New message
    </button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import { Socket } from 'vue-socket.io-extended'
import MainModule from '@/store/modules/'

@Component
export default class App extends Vue {
  public doSmth() {
    const MainModuleInstance = getModule(MainModule, this.$store)

    MainModuleInstance.SOCKET_newMessage()
    // MainModuleInstance.consoleLog() <-- that works!
  }

  @Socket()
  connect() {
    console.log('Hello world!1!')
  }

  @Emit()
  myMethod() {
    this.doSmth()
  }
}
</script>
