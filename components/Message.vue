<template>
  <div><!--class="list-group-item"-->
    <div
      class="message"
      :class="{ owner }"
      v-if="name !== 'Administrator'"
    >
      <h3>{{name}}</h3>
      <p>{{text}}</p>
    </div>
    <div class="message system-message" v-else>
      <p class="text-danger">{{text}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class MessageComp extends Vue {
  @Prop(String) readonly name!: string
  @Prop(String) readonly text!: string
  @Prop({
    default: false,
    type: Boolean
  }) readonly owner!: string
}
</script>

<style scoped>
.system-message {
  margin: 0 auto;
}

.message {
  width: fit-content;
}

.owner {
  margin-left: auto;
}

p {
  margin: 0;
}
</style>
