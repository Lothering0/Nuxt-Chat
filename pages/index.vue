<template>
  <form
    class="card w-25 rounded border-dark mt-5"
    @submit.prevent="submit"
  >
    <div class="card-header bg-warning">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-dots-fill" viewBox="0 0 16 16">
        <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793V2zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
      </svg>
      <span class="ml-2">Nuxt chat</span>
    </div>
    <div class="card-body">
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
    </div>
    <!-- button
      class="btn btn-warning"
      type="button"
      @click="getStoreUser"
    >
      Test
    </button -->
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
