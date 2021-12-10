<template>
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
      <button class="users" @click="showOrHideUserList">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
          <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
          <path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
          <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
        </svg>
      </button>
    </div>
  </nav>
</template>

<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import MainModule from '@/store/modules/'

@Component
export default class Navbar extends Vue {
  getUser() {
    const MainModuleInstance = getModule(MainModule, this.$store)

    return MainModuleInstance.user
  }

  leaveUser() {
    const MainModuleInstance = getModule(MainModule, this.$store)

    return MainModuleInstance.leaveUser(this.getUser())
  }

  clearData() {
    const MainModuleInstance = getModule(MainModule, this.$store)

    MainModuleInstance.clearData()
  }

  showOrHideUserList() {
    const MainModuleInstance = getModule(MainModule, this.$store)

    MainModuleInstance.showOrHideUserList()
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
button {
  display: flex;

  width: 40px;
  height: 40px;

  background-color: transparent;
  border: 0;
  border-radius: 3px;

  transition: .2s;
}

button:hover {
  background: rgba(0,0,0,.07);
}

button:active {
  background: rgba(0,0,0,.2);
}

svg {
  margin: auto;

  transform: scale(2);
}

.users {
  display: none;
}

.navbar .container-fluid {
  justify-content: left !important;
}

@media screen and (max-width: 768px) {
  .navbar .container-fluid {
    justify-content: space-between !important;
  }

  .users {
    display: block;
  }
}
</style>
