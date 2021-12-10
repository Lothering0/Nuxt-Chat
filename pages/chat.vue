<template>
  <div class="chat d-flex align-items-center flex-column">
    <Navbar />

    <div class="w-75 chat-section d-flex align-items-start border-dark mt-5">
      <div
        class="nav flex-column nav-pills me-3"
        :class="{ 'hide': getUserListIsHidden() }"
        id="v-pills-tab"
        role="tablist"
        aria-orientation="vertical"
      >
        <ul class="list-group">
          <li
            class="user nav-link btn mb-2"
            id="v-pills-home-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-home"
            type="button"
            role="tab"
            aria-controls="v-pills-home"
            aria-selected="true"
            v-for="{ name, color, userId } of getUsers()"
            :style="{ backgroundColor: color }"
            :key="userId"
          ><span :style="{ color, filter: 'invert(1)' }">{{name}}</span></li>
        </ul>
      </div>

      <div class="messages-and-form">
        <ul class="messages list-group ml-3" ref="block">
          <Message
            v-for="{ name, color, text, id } of messages"
            :name="name"
            :color="color"
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
import { Vue, Component, Watch } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import { MetaInfo } from 'vue-meta'
import { Socket } from 'vue-socket.io-extended'
import MainModule from '@/store/modules/'
import User from '@/interfaces/user-interface'
import Message from '@/interfaces/message-interface'

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

  getMessages() {
    const MainModuleInstance = getModule(MainModule, this.$store)

    return MainModuleInstance.messages
  }

  getUserListIsHidden() {
    const MainModuleInstance = getModule(MainModule, this.$store)

    return MainModuleInstance.getUserListIsHidden
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
    this.setUsers(users)
  }
}
</script>

<style scoped>
.w-75 {
  width: 75% !important;
  min-width: 15% !important;
}

.navbar, .chat {
  width: 100%;
}

.chat-section {
  height: 75vh;
  position: relative;
}

.container-fluid {
  justify-content: unset;
}

.messages-and-form {
  display: flex;
  position: relative;
  width: 100%;
  min-width: 50%;
  height: 100%;
  flex-direction: column;
}

.messages {
  width: 100%;
  height: 100%;

  margin-left: 0 !important;

  overflow-y: auto;
}

.nav-pills {
  max-width: 213px;
  min-width: 213px;
  height: 100%;

  margin-right: 3px;

  overflow-y: scroll;
}

.user {
  width: 200px;
}

form {
  display: flex;
}

@media screen and (max-width: 768px) {
  .nav-pills {
    background-color: white;
    position: absolute;
    z-index: 2;
    width: 100%;
    max-width: 768px;
  }

  .user {
    margin: 0 auto;
  }

  .hide {
    display: none !important;
  }
}
</style>
