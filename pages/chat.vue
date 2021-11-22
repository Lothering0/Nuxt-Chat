<template>
  <div>
    <h1>
      <nuxt-link to="/">
        <button class="btn btn-secondary">
            ←
        </button>
      </nuxt-link>
      Chat page
      <span class="badge badge-dark">{{getUser().name}}</span>
    </h1>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
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
}
</script>
