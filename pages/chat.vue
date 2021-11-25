<template>
  <div class="chat d-flex align-items-center flex-column">
    <nav class="navbar navbar-light bg-warning">
      <div class="container-fluid">
        <button class="arrow" @click="exit">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
          </svg>
        </button>
        <span class="navbar-brand mb-0 ml-3 h1">
          Chat page
        </span>
      </div>
    </nav>

    <div class="w-75 chat-section d-flex align-items-start border-dark mt-5">
      <div
        class="nav flex-column nav-pills me-3"
        id="v-pills-tab"
        role="tablist"
        aria-orientation="vertical"
      >
        <ul class="list-group">
          <li
            class="user nav-link btn active mb-2"
            id="v-pills-home-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-home"
            type="button"
            role="tab"
            aria-controls="v-pills-home"
            aria-selected="true"
            v-for="{ name, color, userId } of getUsers()"
            :style="`background: ${color}`"
            :key="userId"
          >{{name}}</li>
        </ul>
      </div>

      <div class="messages-and-form">
        <ul class="messages list-group ml-3" ref="block">
          <Message
            v-for="{ name, text, id } of messages"
            :name="name"
            :text="text"
            :owner="id === getUser().userId"
          />
        </ul>

        <ChatForm />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit, Watch } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import { MetaInfo } from 'vue-meta'
import { Socket } from 'vue-socket.io-extended'
import MainModule from '@/store/modules/'

interface User {
  name: string
  room: string | number
  color: string
  userId?: string
}

interface Message {
  name: string
  text: string
}

@Component({
  middleware: ['chat'],
  head(): MetaInfo {
    return {
      title: `Room: ${(this as Chat).room}`
    }
  }
})
export default class Chat extends Vue {
  userId = this.getUser().userId
  room = this.getUser().room
  messages = this.getMessages()

  $refs!: {
    block: HTMLFormElement
  }

  @Watch('messages')
  setScroll() {
    setTimeout(() => {
      this.$refs.block.scrollTop = this.$refs.block.scrollHeight
    })
  }

  getUser() {
    const MainModuleInstance = getModule(MainModule, this.$store)

    return MainModuleInstance.user
  }

  getUsers() {
    const MainModuleInstance = getModule(MainModule, this.$store)

    return MainModuleInstance.users
  }

  leaveUser() {
    const MainModuleInstance = getModule(MainModule, this.$store)

    return MainModuleInstance.leaveUser(this.getUser())
  }

  clearData() {
    const MainModuleInstance = getModule(MainModule, this.$store)

    MainModuleInstance.clearData()
  }

  getMessages() {
    const MainModuleInstance = getModule(MainModule, this.$store)

    return MainModuleInstance.messages
  }

  setNewMessage(message: Message) {
    const MainModuleInstance = getModule(MainModule, this.$store)

    MainModuleInstance.setNewMessage(message)
  }

  setUsers(users: User[]) {
    const MainModuleInstance = getModule(MainModule, this.$store)

    MainModuleInstance.setUsers(users)
  }

  @Socket('newMessage')
  onNewMessage(message: Message) {
    this.setNewMessage(message)
  }

  @Socket('updateUsers')
  onUpdateUsers(users: User[]) {
    console.log(users)
    this.setUsers(users)
  }

  @Emit()
  exit() {
    this.leaveUser()
    this.$router.push('/')
    this.clearData()
  }
}
</script>

<style scoped>
.navbar, .chat {
  width: 100%;
}

.chat-section {
  /* background-color: rgba(230,140,10,.4); */
  height: 75vh;
  position: relative;
}

.container-fluid {
  justify-content: unset;
}

button.arrow {
  transform: scale(2) translateY(-2px);
  background-color: transparent;
  border: 0;
}

.bi {
  margin-bottom: 1px;
}

.messages-and-form {
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  flex-direction: column;
}

.messages {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

.user {
  width: 200px;
}

form {
  display: flex;
}
</style>
