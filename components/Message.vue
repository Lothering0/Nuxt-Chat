<template>
  <li>
    <div
      class="message rounded"
      :class="{ owner }"
      v-if="name !== 'Administrator'"
    >
      <h3>{{name}}</h3>
      <p>{{text}}</p>
    </div>
    <div class="message system-message" v-else>
      <p class="text-danger">{{text}}</p>
    </div>
  </li>
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
li {
  width: 100%;
  list-style: none;
}

.message {
  width: 60%;
  box-shadow: 0 0 4px 1px rgba(50, 50, 50, .2);
}

.system-message {
  width: fit-content;
  box-shadow: none;
  margin: 0 auto;
}

.owner {
  margin-left: auto;
}

p {
  margin: 0;
}
</style>
