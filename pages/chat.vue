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

    <div class="w-50 d-flex align-items-start border-dark mt-5">
      <div
        class="nav flex-column nav-pills me-3"
        id="v-pills-tab"
        role="tablist"
        aria-orientation="vertical"
      >
        <button
          class="nav-link btn active"
          id="v-pills-home-tab"
          data-bs-toggle="pill"
          data-bs-target="#v-pills-home"
          type="button"
          role="tab"
          aria-controls="v-pills-home"
          aria-selected="true"
        >Home</button>
        <button
          class="nav-link btn"
          id="v-pills-profile-tab"
          data-bs-toggle="pill"
          data-bs-target="#v-pills-profile"
          type="button"
          role="tab"
          aria-controls="v-pills-profile"
          aria-selected="false"
        >Profile</button>
        <button
          class="nav-link btn"
          id="v-pills-messages-tab"
          data-bs-toggle="pill"
          data-bs-target="#v-pills-messages"
          type="button"
          role="tab"
          aria-controls="v-pills-messages"
          aria-selected="false"
        >Messages</button>
        <button
          class="nav-link btn"
          id="v-pills-settings-tab"
          data-bs-toggle="pill"
          data-bs-target="#v-pills-settings"
          type="button"
          role="tab"
          aria-controls="v-pills-settings"
          aria-selected="false"
        >Settings</button>
      </div>
      <div class="tab-content" id="v-pills-tabContent">
        <div
          class="ml-3"
          id="v-pills-home"
          role="tabpanel"
          aria-labelledby="v-pills-home-tab"
        >
          Some content Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores accusantium impedit nisi facere deleniti blanditiis explicabo dolores sunt. Corrupti distinctio dolorum culpa vitae voluptate?
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import { MetaInfo } from 'vue-meta'
import MainModule from '@/store/modules/'

@Component({
  middleware: ['chat'],
  head(): MetaInfo {
    return {
      title: `Room: ${(this as Chat).room}`
    }
  }
})
export default class Chat extends Vue {
  room = this.getUser().room

  getUser() {
    const MainModuleInstance = getModule(MainModule, this.$store)

    return MainModuleInstance.user
  }

  @Emit()
  exit() {}
}
</script>

<style scoped>
.navbar, .chat {
  width: 100%;
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
</style>
