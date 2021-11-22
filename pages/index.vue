<template>
  <form
    class="w-25 p-3 rounded needs-validation"
    style="background: #eee;"
    @submit.prevent="submit"
  >
    <h3 class="d-flex justify-content-center">Nuxt chat</h3>
    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="Type username"
        aria-label="Type username"
        aria-describedby="basic-addon2"
        maxlength="10"
        minlength="3"
        v-model="name"
      >
    </div>
    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="Type room id"
        aria-label="Type room id"
        aria-describedby="basic-addon2"
        maxlength="10"
        minlength="3"
        v-model="room"
      >
    </div>

    <button class="btn btn-primary" type="submit">
      Enter
    </button>
    <button
      class="btn btn-warning"
      type="button"
      @click="getStoreUser"
    >
      Test
    </button>
  </form>
</template>

<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import { Socket } from 'vue-socket.io-extended'
import MainModule from '@/store/modules/'

interface Message {
  text: string
}

interface User {
  name: string
  room: string | number
}

@Component
export default class App extends Vue {
  name = ''
  room = ''

  setUser(user: User) {
    const MainModuleInstance = getModule(MainModule, this.$store)

    MainModuleInstance.setUser(user)
  }

  getUser() {
    const MainModuleInstance = getModule(MainModule, this.$store)

    return MainModuleInstance.getUser
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
  submit() {
    if (this.name && this.room) {
      const user = {
        name: this.name,
        room: this.room
      }

      this.setUser(user)
      this.$router.push('/chat')

      this.name = this.room = ''
    }
  }

  @Emit()
  getStoreUser() {
    console.log(this.getUser())
  }
}
</script>
